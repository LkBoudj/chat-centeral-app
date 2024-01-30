import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";
import { TRPCError } from "@trpc/server";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { ConversationController, MessageController } from "@/lib/controller";
import TechnologiesContainer from "@/lib/technolgie_container";
import mediaController from "@/lib/controller/media_controller";
import technologyController from "@/lib/controller/technology_controller";

export async function POST(req: NextRequest) {
  const { content, technologyId, conversationId, model, fileId } =
    await req.json();

  const session = await getAuthSession();
  const auth = session?.user;

  const validation: any = await createNewMessageBackV.safeParseAsync({
    content,
    conversationId,
    technologyId,
    fileId,
    model,
  });

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

  const isFileExits: any = fileId
    ? await mediaController.isExits({
        userId: auth.id,
        id: fileId as number,
      })
    : false;

  const userMessage: AppMessage = {
    content,
    conversationId: validation.data.conversationId as string,
    technologyId: 1,
    userId: auth.id,
  };

  const newMessage = await MessageController.create(userMessage);

  // if (isFileExits) {
  //   const updatedFile = await mediaController.update({
  //     id: isFileExits?.id,
  //     userId: auth.id,
  //     messageId: newMessage.id,
  //   });

  //   return TechnologiesContainer.generateTextCompletionVison({
  //     model: model,
  //     path: updatedFile?.src,
  //     userMessage,
  //     stream: true,
  //   });
  // }
  const isTechExits = await technologyController.isExits({ id: technologyId });

  if (isTechExits) {
    if (isTechExits.refTech.trim().toLowerCase().startsWith("dall")) {
      const aiMessage = await MessageController.create({
        userId: auth.id,
        fromMachin: true,
        conversationId: userMessage.conversationId,
        technologyId,
      });
      return TechnologiesContainer.generateImageDallE({
        model: model,
        message: aiMessage,
        userId: auth.id,
        content: content,
      });
    }

    return TechnologiesContainer.generateTextCompletion({
      model: model,
      userMessage,
      stream: true,
    });
  }
}
