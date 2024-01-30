import OpenAI from "openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";

import { MessageController } from "./controller";
import { NextResponse } from "next/server";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { chatOpenAiModel } from "./langchain/library";
import { saveImageFromURL } from "./helper";
import mediaController from "./controller/media_controller";
import { Message } from "@prisma/client";

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
    console.log(model);

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
}
const technologiesContainer = new TechnologiesContainer();
export default technologiesContainer;
