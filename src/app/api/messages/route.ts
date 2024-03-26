import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";

import { ConversationController, MessageController } from "@/lib/controller";

import technologyController from "@/lib/controller/technology_controller";
import technologiesContainer, { AiInput } from "@/lib/technolgie_container";
import mediaController from "@/lib/controller/media_controller";
import prismaConfig from "@/lib/configs/prismaConfig";
import { Media } from "@prisma/client";

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

    const validation: any = await createNewMessageBackV.safeParseAsync({
      content,
      conversationId,
      technologyId,
      fileId: files,
    });

    if (!validation.success) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const newConversation: any = await ConversationController.create({
      title: content,
      userId,
    });

    if (!newConversation) {
      return NextResponse.json("nor conversation id", { status: 400 });
    }

    const userMessage: AppMessage = {
      content,
      conversationId: newConversation.id as string,
      technologyId: 1,
      userId,
    };

    const isFileExits: Media | null = validation.data.fileId
      ? await mediaController.checkMediaExists({
          userId,
          id: files[0],
        })
      : null;

    const newMessage = await MessageController.create(userMessage);

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
      const messageData: AiInput = {
        userMessage,
        model,
        headers: {
          conversationId: newConversation.id,
        },
        mediaType: isFileExits?.type ?? null,
        path: isFileExits?.src ?? null,
        refTech: isTechExits.refTech,
      };

      return technologiesContainer.handelAiTechNologies(messageData);
    }
    // await TechnologiesContainer.generateTextCompletion({ userMessage });
    // return NextResponse.json({ conversationId: newConversation.id });
  } catch (e: any) {
    console.log(e);

    return NextResponse.json(
      {
        data: [],
        success: false,
        errors: "tray agin",
      },
      { status: 400 }
    );
  }
}
