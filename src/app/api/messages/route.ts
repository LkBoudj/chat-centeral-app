import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { createNewMessageBackV } from "@/lib/validation";

import { ConversationController, MessageController } from "@/lib/controller";

import technologyController from "@/lib/controller/technology_controller";
import technologiesContainer from "@/lib/technolgie_container";
import mediaController from "@/lib/controller/media_controller";

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

    const isTechExits = await technologyController.isExits({
      id: technologyId,
    });
    if (isTechExits) {
      const isFileExits: any = fileId
        ? await mediaController.isExits({
            userId,
            id: fileId as number,
          })
        : null;
      await MessageController.create(userMessage);
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
    console.log(e);

    return NextResponse.json(e, { status: 400 });
  }
}
