import { limit_infinite_messagess } from "../configs/infinte_scrolle_config";
import prismaConfig from "../configs/prismaConfig";
import Controllers from "./controler";

class ConversationController extends Controllers {
  async infintyLoad({
    limit = limit_infinite_messagess,
    skip,
    cursor,
    userId,
  }: {
    limit: number;
    skip?: number;
    cursor: string | null | undefined;
    userId: number;
  }) {
    const conversation = await prismaConfig.conversation.findMany({
      take: limit + 1,
      skip,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: "desc",
      },
    });
    return this.paginationData({ limit, items: conversation, cursor });
  }
  async isExits({ userId, id }: { userId: number; id: string }) {
    const isExits = await prismaConfig.conversation.findUnique({
      where: {
        userId,
        id,
      },
    });
    return isExits;
  }
  async create({ userId, title }: { userId: number; title: string }) {
    const newConversation = await prismaConfig.conversation.create({
      data: {
        userId,
        title,
      },
    });
    return newConversation;
  }

  async delete({ userId, id }: { userId: number; id: string }) {
    const deleted = await prismaConfig.conversation.delete({
      where: {
        id,
        userId,
      },
    });
    console.log(deleted);
  }
}

const conversationController = new ConversationController();

export default conversationController;
