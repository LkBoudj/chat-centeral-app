import prismaConfig from "../configs/prismaConfig";

class MediaController {
  async create({
    src,
    type,
    userId,
    messageId,
  }: {
    userId: number;
    src: string;
    type: string;
    messageId?: number;
  }) {
    const media = await prismaConfig.media.create({
      data: {
        src,
        type,
        userId,
        messageId,
      },
    });

    return media;
  }

  async update({
    id,
    src,
    type,
    userId,
    messageId,
  }: {
    id: number;
    userId: number;
    src?: string;
    type?: string;
    messageId?: number;
  }) {
    const media = await prismaConfig.media.update({
      data: {
        id,
        src,
        type,
        userId,
        messageId,
      },
      where: {
        id,
        userId,
      },
    });

    return media;
  }
  async isExits({ id, userId }: { userId?: number; id: number }) {
    const isExits = await prismaConfig.media.findUnique({
      where: {
        id,
        userId,
      },
    });
    return isExits;
  }
}

const mediaController = new MediaController();

export default mediaController;
