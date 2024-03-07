import prismaConfig from "../configs/prismaConfig";
import { InputsInfintyLoadPrompts } from "@/lib/validation/prompts_validation";
import Controllers from "./controler";
import { log } from "console";

class PromptController extends Controllers {
  async showAll({
    limit,
    search,
    cursor,
    skip,
    myPrompts,
    userId,
    techId,
  }: InputsInfintyLoadPrompts) {
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
    const items = await prismaConfig.prompt.findMany({
      where,
      take: limit + 1,
      skip,
      cursor: cursor ? { id: cursor } : undefined,
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
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return this.paginationData({ limit, items, cursor });
  }
}

const promptController = new PromptController();
export default promptController;
