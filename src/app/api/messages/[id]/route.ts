import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";
import { TRPCError } from "@trpc/server";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { ConversationController, MessageController } from "@/lib/controller";

import mediaController from "@/lib/controller/media_controller";
import technologyController from "@/lib/controller/technology_controller";

import technologiesContainer, { AiInput } from "@/lib/technolgie_container";
import prismaConfig from "@/lib/configs/prismaConfig";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { content, technologyId, conversationId, model, files } =
      await req.json();

    const session = await getAuthSession();
    const userId = session?.user.id;

    const user = await prismaConfig.user.findUnique({
      where: {
        id: userId,
      },
    });

    const validation: any = await createNewMessageBackV.safeParseAsync({
      content,
      conversationId,
      technologyId,
      fileId: files,
      model,
    });

    if (user && user?.msgCounter < user?.messagesMax) {
      await prismaConfig.user.update({
        data: {
          msgCounter: user?.msgCounter + 1,
        },
        where: {
          id: userId,
        },
      });
    } else {
      return NextResponse.json(
        { message: "Your balance has expired" },
        { status: 400 }
      );
    }

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

    const userMessage: AppMessage = {
      content,
      conversationId: validation.data.conversationId as string,
      technologyId: 1,
      userId,
    };

    const newMessage = await MessageController.create(userMessage);

    const isFileExits: any = validation.data.fileId
      ? await mediaController.checkMediaExists({
          userId,
          id: files[0],
        })
      : null;

    if (isFileExits) {
      await mediaController.linkToMessage({
        mediaId: isFileExits.id,
        messageId: newMessage.id,
      });
    }
    const isTechExits = await technologyController.isExits({
      id: technologyId,
    });

    if (isTechExits) {
      const oldMessagesData = await prismaConfig.message.findMany({
        where: {
          conversationId,
          userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      const dataMessage: AiInput = {
        userMessage,
        model,
        path: isFileExits?.src ?? null,
        mediaType: isFileExits?.type ?? null,
        oldMessagesData,
        refTech: isTechExits.refTech,
        userId,
      };
      return technologiesContainer.handelAiTechNologies(dataMessage);
    }
  } catch (e: any) {
    const errors =
      process.env.NODE_ENV == "development" ? e : "your message not send";
    return NextResponse.json(
      { success: false, data: null, errors },
      { status: 400 }
    );
  }
}
