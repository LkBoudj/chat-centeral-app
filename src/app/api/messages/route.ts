import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";

import { ConversationController, MessageController } from "@/lib/controller";

import technologyController from "@/lib/controller/technology_controller";
import technologiesContainer from "@/lib/technolgie_container";
import mediaController from "@/lib/controller/media_controller";
import prismaConfig from "@/lib/configs/prismaConfig";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { content, technologyId, conversationId, model, media } =
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

    const isFileExits: any = validation.data.fileId
      ? await mediaController.checkMediaExists({
          userId,
          id: media?.id,
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
      return technologiesContainer.handelAiTechNologies({
        userMessage,
        model,
        headers: {
          conversationId: newConversation.id,
        },
        path: isFileExits?.src,
        refTech: isTechExits.refTech,
      });
    }
    // await TechnologiesContainer.generateTextCompletion({ userMessage });
    // return NextResponse.json({ conversationId: newConversation.id });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}
