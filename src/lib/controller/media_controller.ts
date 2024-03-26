import {
  linkMediaToMessageError,
  MediaNotExitsError,
} from "../configs/custom_errors_thorw";
import prismaConfig from "../configs/prismaConfig";
import { isFileExists, removeFile } from "../helper";

interface MediaSearchParams {
  userId?: string;
  id?: number;
  type?: string;
}

interface CreateMediaParams extends MediaSearchParams {
  src: string;
  type: string;
  userId: string;
}

interface UpdateMediaParams extends CreateMediaParams {
  id: number;
}

interface CheckMediaParams extends MediaSearchParams {
  id: number;
  userId: string;
}

class MediaController {
  async findMany({ id, userId, type }: MediaSearchParams) {
    const medias = await prismaConfig.media.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        id,
        userId,
        type: {
          startsWith: type || "",
        },
      },
    });
    return medias;
  }

  async linkToMessage({
    messageId,
    mediaId,
  }: {
    messageId: number;
    mediaId: number;
  }) {
    const linked = await prismaConfig.messageMedias.create({
      data: {
        messageId,
        mediaId,
      },
    });
    if (linked) {
      return true;
    }

    throw new linkMediaToMessageError("Media is not linked with message");
  }

  async create({ src, type, userId }: CreateMediaParams) {
    const media = await prismaConfig.media.create({
      data: {
        src,
        type,
        userId,
      },
    });
    if (media.id) {
      return media;
    }

    throw new Error("Media is not created");
  }

  async createMny(data: CreateMediaParams[]) {
    const medias = await prismaConfig.media.createMany({
      data,
    });

    console.log(medias, medias.count);

    if (medias.count) {
      return medias.count;
    }
    throw new Error("Media is not created");
  }

  async update({ id, src, type, userId }: UpdateMediaParams) {
    const media = await prismaConfig.media.update({
      data: {
        src,
        type,
        userId,
      },
      where: {
        id,
        userId,
      },
    });
    if (media.id) {
      return media;
    }

    throw new Error("Media is not updated");
  }

  async checkMediaExists({ id, userId }: CheckMediaParams) {
    const existsMedia = await prismaConfig.media.findUnique({
      where: {
        id,
        userId,
      },
    });

    return existsMedia;
  }

  async delete({ id, userId }: CheckMediaParams) {
    const existingMedia = await this.checkMediaExists({ id, userId });

    if (!existingMedia) {
      throw new MediaNotExitsError("Media not found.");
    } else {
      const isFileExistisnFolder = await isFileExists("", existingMedia.src);

      if (isFileExistisnFolder) {
        await removeFile("", existingMedia.src);
      }

      const deletedMedia = await prismaConfig.media.delete({
        where: {
          id,
          userId,
        },
      });

      return deletedMedia.id;
    }
  }
}

const mediaController = new MediaController();

export default mediaController;
