import OpenAI from "openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";

import { MessageController } from "./controller";
import { NextResponse } from "next/server";

import {
  convertImageToBaseFromUrl,
  createAudioFile,
  saveImageFromURL,
} from "./helper";
import mediaController from "./controller/media_controller";

import messageController from "./controller/message_controller";
import prismaConfig from "./configs/prismaConfig";

interface BaseAiInput {
  userMessage: AppMessage;
  model?: string;
  headers?: any;
  userId?: number;
}

interface DallInput extends BaseAiInput {}
interface GPT4Input extends BaseAiInput {
  oldMessages?: any[];
}
interface VisionInput extends BaseAiInput {
  oldMessages?: any[];
  path: string;
}
interface voiceInput extends BaseAiInput {}

interface AiInput extends BaseAiInput {
  refTech?: string;
  oldMessages?: any[];
  path?: string;
}
class TechnologiesContainer {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
    });
  }

  async generateTextCompletion({
    oldMessages,
    model,
    userMessage,
    headers,
  }: GPT4Input) {
    const response: any = await this.openai.chat.completions.create({
      model: model ?? "gpt-4-0125-preview",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "Use the following parts of previous conversations if the question is related to markdown format.",
        },
        {
          role: "user",
          content: `Use the following parts of previous conversations if the question is related to old messages, markdown format.\n, if the question is incomplete, say complete your question. Say it politely. 
          
          PREVIOUS CONVERSATION:
          ${oldMessages?.map((message) => {
            if (message.role === "user") return `User: ${message.content}\n`;
            return `Assistant: ${message.content}\n`;
          })}

          USER INPUT: ${userMessage.content}
          `,
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

    return new StreamingTextResponse(streamResponse, {
      headers,
    });
  }
  async generateImageDallE({ model, userMessage, headers, userId }: DallInput) {
    const response = await this.openai.images.generate({
      prompt: userMessage.content ?? "",
      model: model ?? "dall-e-3",
    });

    const message = await MessageController.create({
      userId: userMessage.userId,
      fromMachin: true,
      conversationId: userMessage.conversationId,
      technologyId: userMessage.technologyId,
    });
    const media = response.data.map((m) => ({
      src: m.url,
      type: "image",
      prompt: m.revised_prompt,
      messageId: message.id,
      userId: userMessage.userId,
      createdAt: new Date(),
      updadedAt: new Date(),
    }));

    saveImageFromURL(media, async (data) => {
      const createdMedia = await mediaController.create({
        userId: userMessage.userId,
        src: data.src,
        type: data.type,
        messageId: message.id,
      });

      await mediaController.blongToMessage({
        mediaId: createdMedia.id,
        messageId: message.id,
      });
    });

    const aiMessage = await prismaConfig.message.findUnique({
      where: {
        userId,
        id: message.id,
      },
      include: {
        media: {
          include: {
            medias: true,
          },
        },
      },
    });
    return NextResponse.json(aiMessage, { status: 200, headers });
  }

  async generateTextCompletionVison({
    model,
    userMessage,
    path,
    headers,
  }: VisionInput) {
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

    return new StreamingTextResponse(streamResponse, {
      headers,
    });
  }

  async genrateVioce({ model, userMessage, headers, userId }: voiceInput) {
    const mp3 = await this.openai.audio.speech.create({
      model: model ?? "tts-1",
      voice: "alloy",
      input: userMessage.content ?? "",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    const name = `/media/audio/speech_${Date.now()}.mp3`;
    const pathFile = await createAudioFile(name, buffer);

    const message = await MessageController.create({
      userId: userMessage.userId,
      fromMachin: true,
      conversationId: userMessage.conversationId,
      technologyId: userMessage.technologyId,
    });
    const media = await mediaController.create({
      userId: userMessage.userId,
      src: pathFile,
      type: "audio",
    });
    await mediaController.blongToMessage({
      mediaId: media.id,
      messageId: message.id,
    });
    const aiMessage = await prismaConfig.message.findUnique({
      where: {
        userId,
        id: message.id,
      },
      include: {
        media: {
          include: {
            medias: true,
          },
        },
      },
    });

    return NextResponse.json(aiMessage, { status: 200, headers });
  }

  async handelAiTechNologies({
    refTech,
    oldMessages,
    model,
    userMessage,
    headers,
    path,
    userId,
  }: AiInput) {
    if (path) {
      return this.generateTextCompletionVison({
        path,
        userMessage,
        model,
        userId,
      });
    }
    switch (refTech?.trim().toLowerCase()) {
      case "gpt4":
        return await this.generateTextCompletion({
          oldMessages,
          model,
          userMessage,
          headers,
          userId,
        });
      case "gpt3":
        return await this.generateTextCompletion({
          oldMessages,
          model,
          userMessage,
          headers,
          userId,
        });
      case "dall-e":
        return await this.generateImageDallE({
          model,
          userMessage,
          headers,
          userId,
        });
      case "tts":
        return await this.genrateVioce({
          model,
          userMessage,
          headers,
          userId,
        });

      default:
        console.log("no tech selected");
    }
  }
}
const technologiesContainer = new TechnologiesContainer();
export default technologiesContainer;
