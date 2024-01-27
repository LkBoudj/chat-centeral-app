import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import prismaConfig from "@/lib/configs/prismaConfig";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  await prismaConfig.message.create({
    data: {
      content: messages,
      senderId: 1,
    },
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [{ role: "user", content: messages }],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await prismaConfig.message.create({
        data: {
          content: completion,
          senderId: 1,
          isUserMessage: false,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
