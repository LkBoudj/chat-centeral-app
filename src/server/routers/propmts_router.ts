import { schemCreateTechBack } from "@/lib/validation/technology_validation";
import { privateProcuder, router } from "../trpc";

import PromptController from "@/lib/controller/propmt_controller";
import { z } from "zod";

const promptsAppRouter = router({
  showAll: privateProcuder
    .input(z.object({ search: z.string() }))
    .query(async (obj) => {
      const { input } = obj;
      console.log(input);

      return await PromptController.showAll();
    }),
  create: privateProcuder
    .input(schemCreateTechBack)
    .mutation(async ({ ctx, input }) => {
      const { logo, refTech, name, models } = input;

      console.log(logo);

      return true;
    }),
});

export default promptsAppRouter;
