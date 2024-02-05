import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";
import { TRPCError } from "@trpc/server";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { ConversationController, MessageController } from "@/lib/controller";

import mediaController from "@/lib/controller/media_controller";
import technologyController from "@/lib/controller/technology_controller";

import technologiesContainer from "@/lib/technolgie_container";
import prismaConfig from "@/lib/configs/prismaConfig";
import { headers } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { content, technologyId, conversationId, model, fileId } =
      await req.json();

    const session = await getAuthSession();
    const userId = session?.user.id;

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
      userId,
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
          userId,
          id: fileId as number,
        })
      : null;

    const userMessage: AppMessage = {
      content,
      conversationId: validation.data.conversationId as string,
      technologyId: 1,
      userId,
    };

    const newMessage = await MessageController.create(userMessage);

    const isTechExits = await technologyController.isExits({
      id: technologyId,
    });

    if (isTechExits) {
      const oldMessages = await prismaConfig.message.findMany({
        where: {
          conversationId,
          userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return technologiesContainer.handelAiTechNologies({
        userMessage,
        model,
        path: isFileExits?.src,
        oldMessages,
        refTech: isTechExits.refTech,
      });
    }
  } catch (e: any) {
    const errros =
      process.env.NODE_ENV == "development" ? e : "your message not send";
    return NextResponse.json(errros, { status: 400 });
  }
}

/**
  
 if (isFileExits) {
    const updatedFile = await mediaController.update({
      id: isFileExits?.id,
      userId,
      messageId: newMessage.id,
    });

    return TechnologiesContainer.generateTextCompletionVison({
      path: updatedFile?.src,
      userMessage,
    });
  }
  if (isTechExits.refTech.trim().toLowerCase().startsWith("dall")) {
      const aiMessage = await MessageController.create({
        userId,
        fromMachin: true,
        conversationId: userMessage.conversationId,
        technologyId,
      });
      return TechnologiesContainer.generateImageDallE({
        model: model,
        message: aiMessage,
        userId,
        content: content,
      });
    }
    
    const formattedPrevMessages = oldMessages.map((msg) => ({
      role: !msg.fromMachin ? ("user" as const) : ("assistant" as const),
      content: msg.content,
    }));
    return TechnologiesContainer.generateTextCompletion({
      oldMessages: formattedPrevMessages,
      model: model,
      userMessage,
      stream: true,
    });



 */
