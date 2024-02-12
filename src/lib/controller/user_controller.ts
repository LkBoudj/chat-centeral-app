import prismaConfig from "../configs/prismaConfig";

class UserController {
  async isExits({ id, email }: { id?: string; email?: string }) {
    const isExits = await prismaConfig.user.findUnique({
      where: {
        id,
        email,
      },
    });
    return isExits;
  }
}

const userController = new UserController();

export default userController;
