import { schemCreateTechBack } from "@/lib/validation/technology_validation";
import { privateProcuder, router } from "../trpc";

import PromptController from "@/lib/controller/propmt_controller";

import { infintyLoadPrompts } from "@/lib/validation/prompts_validation";

const promptsAppRouter = router({
  showAll: privateProcuder
    .input(infintyLoadPrompts)
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor, search } = input;

      return await PromptController.showAll(input);
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
