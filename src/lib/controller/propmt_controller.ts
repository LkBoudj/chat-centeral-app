import prismaConfig from "../configs/prismaConfig";

class PromptController {
  async showAll() {
    return await prismaConfig.prompt.findMany({
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
