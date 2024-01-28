import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import prismaConfig from "@/lib/configs/prismaConfig";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";
import { TRPCError } from "@trpc/server";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { ConversationController, MessageController } from "@/lib/controller";
import TechnologiesContainer from "@/lib/technolgie_container";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { content, technologyId, conversationId } = await req.json();

    const session = await getAuthSession();
    const auth = session?.user;

    const validation: any = await createNewMessageBackV.safeParseAsync({
      content,
      conversationId,
      technologyId,
    });

    const newConversation: any = await ConversationController.create({
      title: content,
      userId: auth?.id,
    });

    if (!validation.success) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    if (!newConversation) {
      return NextResponse.json("nor conversation id", { status: 400 });
    }
    const userMessage: AppMessage = {
      content,
      conversationId: newConversation.id as string,
      technologyId: 1,
      userId: auth.id,
    };

    await MessageController.create(userMessage);
    await TechnologiesContainer.generateTextCompletion({ userMessage });
    return NextResponse.json({ conversationId: newConversation.id });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}
