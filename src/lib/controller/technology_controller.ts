import prismaConfig from "../configs/prismaConfig";

class TechnologyController {
  async showAll() {
    return await prismaConfig.technology.findMany({
      where: {
        status: true,
      },
    });
  }
}
const technologyController = new TechnologyController();
export default technologyController;
