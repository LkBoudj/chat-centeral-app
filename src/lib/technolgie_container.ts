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

interface AiInput {
  refTech?: string;
  oldMessages?: any[];
  userMessage: AppMessage;
  stream?: boolean;
  model?: string;
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
    stream,
  }: {
    oldMessages?: any[];
    userMessage: AppMessage;
    stream?: boolean;
    model?: string;
  }) {
    const response: any = await this.openai.chat.completions.create({
      model: model ?? "gpt-4-0125-preview",
      stream: stream,
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
  async generateImageDallE({
    model,
    userMessage,
  }: {
    userMessage: AppMessage;
    model?: string;
  }) {
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

    saveImageFromURL(media, (data) => {
      return mediaController.create({
        userId: userMessage.userId,
        src: data.src,
        type: data.type,
        messageId: message.id,
      });
    });
    const aiMessage = {
      ...message,
      media,
    };
    return NextResponse.json(aiMessage, { status: 200 });
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

  async analyzeUserInput({ content }: { content: string }) {
    const response: any = await this.openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: "You are a world-class human text analyst.",
        },
        {
          role: "system",
          content: `Analyze the text of the user's next request and determine whether the user wants to create an image or has another type of request. Based on your understanding, return a structured json object. If the user request is to create an image, your JSON object must have a request type of 'image'
          Include the number of photos if present, or make it one if not specified
          and Includes a new, improved prompt that allows the AI to create a beautiful image of Dall-e,, 
          set the requestType to "other" and capture the essence of the user's need in the prompts attribute.
          and do not try to make up an new structured  json object Maintain the structure of JSON the user wants to return.`,
        },
        {
          role: "user",
          content: `user structur json {"requestType": "image","prompts": "","options":{"n":1,"quealt":"standard"|"hd","size":"sm"|"md"|"lg",}}
          
          or other 
          {"requestType": "text","prompts": "",} 
          
          User Request Text: "${content}"
        
        Expected AI Output:`,
        },
      ],
    });

    return response.choices[0].message.content as string;
  }
  async genrateVioce({
    model,
    userMessage,
  }: {
    userMessage: AppMessage;
    model?: string;
  }) {
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
      messageId: message.id,
    });

    const aiMessage = {
      ...message,
      media,
    };

    return NextResponse.json(aiMessage, { status: 200 });
  }

  async handelAiTechNologies({
    refTech,
    oldMessages,
    model,
    userMessage,
  }: AiInput) {
    switch (refTech?.trim().toLowerCase()) {
      case "gpt4":
        return await this.generateTextCompletion({
          oldMessages,
          model,
          userMessage,
          stream: true,
        });
      case "gpt3":
        return await this.generateTextCompletion({
          oldMessages,
          model,
          userMessage,
          stream: true,
        });
      case "dall-e":
        return await this.generateImageDallE({
          model,
          userMessage,
        });
      case "tts":
        return await this.genrateVioce({
          model,
          userMessage,
        });
      default:
        console.log("no tech selected");
    }
  }
}
const technologiesContainer = new TechnologiesContainer();
export default technologiesContainer;
