import prismaConfig from "../configs/prismaConfig";

class MediaController {
  async findMany({
    id,
    userId,
    type,
  }: {
    userId?: string;
    id?: number;
    type?: string;
  }) {
    const medias = await prismaConfig.media.findMany({
      where: {
        id,
        userId,
        type: {
          startsWith: type ?? "",
        },
      },
    });

    return medias;
  }
  async blongToMessage({
    messageId,
    mediaId,
  }: {
    messageId: number;
    mediaId: number;
  }) {
    await prismaConfig.messageMedias.create({
      data: {
        messageId,
        mediaId,
      },
    });

    return true;
  }
  async create({
    src,
    type,
    userId,
  }: {
    userId: string;
    src: string;
    type: string;
    messageId?: number;
  }) {
    const media = await prismaConfig.media.create({
      data: {
        src,
        type,
        userId,
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
    userId: string;
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
      },
      where: {
        id,
        userId,
      },
    });

    return media;
  }
  async isExits({ id, userId }: { userId?: string; id: number }) {
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
