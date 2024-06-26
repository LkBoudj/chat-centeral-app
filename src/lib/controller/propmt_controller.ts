import prismaConfig from "../configs/prismaConfig";
import { InputsInfintyLoadPrompts as InputsInfinityLoadPrompts } from "@/lib/validation/prompts_validation";
import Controllers from "./controller";

class PromptController extends Controllers {
  async showAll({
    limit,
    search,
    cursor,
    skip,
    myPrompts,
    userId,
    techId,
    tags,
  }: InputsInfinityLoadPrompts) {
    let where: any = {
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          excerpt: {
            contains: search,
          },
        },
        {
          content: {
            contains: search,
          },
        },
      ],
    };
    if (myPrompts) {
      where.userId = userId;
    }

    if (techId) {
      where.technologyId = techId;
    }

    if (tags?.length) {
      where.tags = {
        contains: tags,
      };
    }

    const items = await prismaConfig.prompt.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: "desc",
      },
      include: {
        UsersLikerPrompts: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        technology: {
          select: {
            id: true,
            name: true,
            models: true,
          },
        },
        comments: true,
      },
    });

    return this.paginationData({ limit, items, cursor });
  }
}

const promptController = new PromptController();

export default promptController;
