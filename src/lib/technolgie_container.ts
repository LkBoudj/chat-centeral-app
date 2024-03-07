import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { MessageController } from "./controller";
import { NextResponse } from "next/server";

import {
  convertImageToBaseFromUrl,
  createAudioFile,
  saveImageFromURL,
} from "./helper";
import mediaController from "./controller/media_controller";

import prismaConfig from "./configs/prismaConfig";

import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

interface BaseAiInput {
  userMessage: AppMessage;
  model?: string;
  headers?: any;
  userId?: string;
  oldMessages?: string;
}

interface DallInput extends BaseAiInput { }
interface GPT4Input extends BaseAiInput { }
interface VisionInput extends BaseAiInput {
  path: string;
}
interface voiceInput extends BaseAiInput { }

interface AiInput extends BaseAiInput {
  refTech?: string;
  oldMessagesData?: any[];
  path?: string;
}
class TechnologiesContainer {
  private openai: OpenAI;
  private langChainOpenAi: ChatOpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
    });

    this.langChainOpenAi = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      streaming: true,
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
            "You are a helpful chatbot answering any questions. Your name is chatcentral. You are to answer any question the user has and be friendly, conscie, helppful, and provide accurate info",
        },
        {
          role: "user",
          content: `Use the following parts of previous conversations if the question is related to old messages,\n. 
          
          PREVIOUS CONVERSATION:
          ${oldMessages}

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
    const mediaData = response.data.map((m) => ({
      src: m.url,
      type: "image",
      prompt: m.revised_prompt,
      messageId: message.id,
      userId: userMessage.userId,
      createdAt: new Date(),
      updadedAt: new Date(),
    }));

    saveImageFromURL(mediaData, async (data) => {
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

    const aiMessage: any = await prismaConfig.message.findUnique({
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

    const media = mediaData.map((d) => ({
      medias: d,
    }));
    const aiMessageCreated = {
      ...aiMessage,
      media,
    };
    return NextResponse.json(aiMessageCreated, { status: 200, headers });
  }

  async generateTextCompletionVison({
    model,
    userMessage,
    path,
    headers,
    oldMessages,
  }: VisionInput) {
    const base64_image = await convertImageToBaseFromUrl(path);

    const response = await this.openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 1200,
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful chatbot answering any questions. Your name is chatcentral. You are to answer any question the user has and be friendly, conscie, helppful, and provide accurate info",
        },

        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Use the following parts of previous conversations if the question is related to old messages,\n. 
          
            PREVIOUS CONVERSATION:
            ${oldMessages}
  
            USER INPUT: ${userMessage.content}
            `,
            },
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
      voice: "onyx",
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

  async handelLangChainOpenAi({
    oldMessages,
    model,
    userMessage,
    headers,
  }: GPT4Input) {
    const TEMPLATE = `Use the following parts of previous conversations if the question is related to old messages,\n.

    PREVIOUS CONVERSATION:
    {chat_history}

    User: {input}
    AI:`;

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    this.langChainOpenAi.modelName = model as string;

    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(this.langChainOpenAi).pipe(outputParser);

    const response: any = await chain.stream({
      chat_history: oldMessages as string,
      input: userMessage.content as string,
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
  async handelAiTechNologies({
    refTech,
    oldMessagesData,
    model,
    userMessage,
    headers,
    path,
    userId,
  }: AiInput) {
    const oldMessages = oldMessagesData
      ?.map((message: any) => {
        if (message.role === "user") return `User: ${message.content}\n`;
        return `Assistant: ${message.content}\n`;
      })
      .join("\n");

    if (path) {
      return this.generateTextCompletionVison({
        path,
        userMessage,
        oldMessages,
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
        return this.generateTextCompletion({
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
