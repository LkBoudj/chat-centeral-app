import { Technology } from "@prisma/client";
import prismaConfig from "../configs/prismaConfig";

class TechnologyController {
  async showAll() {
    return await prismaConfig.technology.findMany({
      where: {
        status: true,
      },
    });
  }
  async create({
    name,
    logo,
    models,
    status = true,
  }: {
    name: string;
    logo?: string;
    models?: string;
    status?: boolean;
  }) {
    return await prismaConfig.technology.create({
      data: {
        name,
        refTech: name.trim().toLowerCase().split(" ").join(""),
        logo,
        models,
        status,
      },
    });
  }
  async isExits({ id }: { id: number }) {
    const tech = await prismaConfig.technology.findUnique({
      where: {
        id,
      },
    });

    return tech;
  }
}

const technologyController = new TechnologyController();
export default technologyController;
