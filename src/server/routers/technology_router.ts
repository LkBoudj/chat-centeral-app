import { schemCreateTechBack } from "@/lib/validation/technology_validation";
import { privateProcuder, router } from "../trpc";

import TechnologyController from "@/lib/controller/technology_controller";

const technologyAppRouter = router({
  showAll: privateProcuder.query(async () => {
    return await TechnologyController.showAll();
  }),
  create: privateProcuder
    .input(schemCreateTechBack)
    .mutation(async ({ ctx, input }) => {
      const { logo, refTech, name, models } = input;

      console.log(logo);

      return true;
    }),
});

export default technologyAppRouter;
