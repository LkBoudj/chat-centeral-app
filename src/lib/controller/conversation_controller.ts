import prismaConfig from "../configs/prismaConfig";

class ConversationController {
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
}

export default new ConversationController();
