import OpenAI from "openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";

import { MessageController } from "./controller";
import { NextResponse } from "next/server";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { chatOpenAiModel } from "./langchain/library";
import {
  convertImageToBaseFromUrl,
  createAudioFile,
  saveImageFromURL,
} from "./helper";
import mediaController from "./controller/media_controller";
import { Message } from "@prisma/client";
import path from "path";
import fs from "fs";

class TechnologiesContainer {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
    });
  }

  async generateImageDallE({
    model,
    content,
    userId,
    message,
  }: {
    content: string;
    stream?: boolean;
    model?: string;
    userId: number;
    message: Message;
  }) {
    const response = await this.openai.images.generate({
      prompt: content,
      model: "dall-e-3",
    });

    const media = response.data.map((m) => ({
      src: m.url,
      type: "image",
      prompt: m.revised_prompt,
      messageId: message.id,
      userId,
      createdAt: new Date(),
      updadedAt: new Date(),
    }));

    saveImageFromURL(media, (data) => {
      return mediaController.create({
        userId,
        src: data.src,
        type: data.type,
        messageId: message.id,
      });
    });
    const aiMessage = {
      ...message,
      media,
    };
    return NextResponse.json(aiMessage);
  }

  async generateTextCompletion({
    model,
    userMessage,
    stream,
  }: {
    userMessage: AppMessage;
    stream?: boolean;
    model?: string;
  }) {
    const response: any = await this.openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      stream: stream,
      messages: [{ role: "user", content: userMessage.content as string }],
    });

    if (stream == true) {
      //@ts-ignore
      const streamResponse = OpenAIStream(response, {
        async onCompletion(completion) {
          await MessageController.create({
            ...userMessage,
            content: completion,
            fromMachin: true,
          });
        },
      });

      return new StreamingTextResponse(streamResponse);
    }

    const aiResponse = response.choices[0].message.content;

    const machinMessage = await MessageController.create({
      ...userMessage,
      content: aiResponse,
      fromMachin: true,
    });

    return NextResponse.json(machinMessage);
  }

  async generateTextCompletionLngChain({
    model,
    userMessage,
    stream,
  }: {
    userMessage: AppMessage;
    stream?: boolean;
    model?: string;
  }) {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world class for answer question"],
      ["user", "{input}"],
    ]);
    const chain = prompt.pipe(chatOpenAiModel);
    const streamResponse = await chain.stream({ input: userMessage.content });

    return new StreamingTextResponse(streamResponse);
  }

  async generateTextCompletionVison({
    model,
    userMessage,
    stream,
    path,
  }: {
    path: string;
    userMessage: AppMessage;
    stream?: boolean;
    model?: string;
  }) {
    const base64_image = await convertImageToBaseFromUrl(path);

    const response = await this.openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 1200,
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: userMessage.content as string },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64_image}`,
                detail: "high",
              },
            },
          ],
        },
      ],
    });
    const streamResponse = OpenAIStream(response, {
      async onCompletion(completion) {
        await MessageController.create({
          ...userMessage,
          content: completion,
          fromMachin: true,
        });
      },
    });

    return new StreamingTextResponse(streamResponse);
  }

  async genrateVioce({
    model,
    content,
    userId,
    message,
  }: {
    content: string;
    stream?: boolean;
    model?: string;
    userId: number;
    message: Message;
  }) {
    const mp3 = await this.openai.audio.speech.create({
      model: model ?? "tts-1",
      voice: "alloy",
      input: content,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    const name = `media/audio/speech_${Date.now()}.mp3`;
    const pathFile = await createAudioFile(name, buffer);

    await mediaController.create({
      userId,
      src: pathFile,
      type: "audio",
      messageId: message.id,
    });
  }
}
const technologiesContainer = new TechnologiesContainer();
export default technologiesContainer;
