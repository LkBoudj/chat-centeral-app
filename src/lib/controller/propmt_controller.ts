import prismaConfig from "../configs/prismaConfig";
import { InputsInfintyLoadPrompts } from "@/lib/validation/prompts_validation";

class PromptController {
  async showAll({ limit, search, cursor, skip }: InputsInfintyLoadPrompts) {
    return await prismaConfig.prompt.findMany({
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
  }
}

const promptController = new PromptController();
export default promptController;
