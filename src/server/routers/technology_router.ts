import { schemCreateTechBack } from "@/lib/validation/technology_validation";
import { privateProuder, router } from "../trpc";

import TechnologyController from "@/lib/controller/technology_controller";

const technologyAppRouter = router({
  showAll: privateProuder.query(async () => {
    return await TechnologyController.showAll();
  }),
  create: privateProuder
    .input(schemCreateTechBack)
    .mutation(async ({ ctx, input }) => {
      const { logo, refTech, name, models } = input;

      console.log(logo);

      return true;
    }),
});

export default technologyAppRouter;
