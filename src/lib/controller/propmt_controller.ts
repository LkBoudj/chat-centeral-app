import prismaConfig from "../configs/prismaConfig";

class PromptController {
  async showAll() {
    return await prismaConfig.prompt.findMany({});
  }
}

const promptController = new PromptController();
export default promptController;
