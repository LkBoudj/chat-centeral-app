import prismaConfig from "../configs/prismaConfig";

class MessageController {
  paginationData({
    messages,
    cursor,
    limit,
  }: {
    messages: any[];
    cursor: number | null | undefined;
    limit: number;
  }) {
    let nextCursor: typeof cursor | undefined = undefined;
    const sortedData = messages.sort(function (p1, p2) {
      if (p1.id < p2.id) return -1;
      if (p1.id > p2.id) return 1;
      return 0;
    });
    if (sortedData.length > limit) {
      const nextItem = sortedData[0]; // return the last item from the array
      nextCursor = nextItem?.id;
    }

    return {
      ietms: sortedData,
      nextCursor,
    };
  }
  async infintyLoad({
    limit,
    skip,
    cursor,
    userId,
    conversationId,
  }: {
    limit: number;
    skip?: number;
    cursor: number | null | undefined;
    userId: number;
    conversationId: string;
  }) {
    const messages = await prismaConfig.message.findMany({
      take: limit + 1,
      skip,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        conversation: {
          userId,
          id: conversationId,
        },
      },
      include: {
        technology: true,
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return this.paginationData({ limit, messages, cursor });
  }

  async create({
    content,
    conversationId,
    technologyId,
    userId,
    fromMachin,
  }: AppMessage) {
    return await prismaConfig.message.create({
      data: {
        content,
        conversationId,
        technologyId,
        fromMachin,
        userId,
      },
      include: {
        conversation: true,
      },
    });
  }
}

const messageController = new MessageController();

export default messageController;
