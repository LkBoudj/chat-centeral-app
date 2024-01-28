import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";
import { TRPCError } from "@trpc/server";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { ConversationController, MessageController } from "@/lib/controller";
import TechnologiesContainer from "@/lib/technolgie_container";

export async function POST(req: NextRequest) {
  const { content, technologyId, conversationId, model } = await req.json();

  const session = await getAuthSession();
  const auth = session?.user;

  const validation: any = await createNewMessageBackV.safeParseAsync({
    content,
    conversationId,
    technologyId,
    model,
  });

  //console.log(validation);

  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const isExits = await ConversationController.isExits({
    userId: auth.id,
    id: conversationId,
  });

  if (!isExits) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: CONVARSATION_NOT_FOUND,
      cause: "theError",
    });
  }

  const userMessage: AppMessage = {
    content,
    conversationId: validation.data.conversationId as string,
    technologyId: 1,
    userId: auth.id,
  };

  await MessageController.create(userMessage);

  return TechnologiesContainer.generateTextCompletion({
    model: model,
    userMessage,
    stream: true,
  });
}
