import { schemCreateTechBack } from "@/lib/validation/technology_validation";
import { privateProcuder, router } from "../trpc";

import PromptController from "@/lib/controller/propmt_controller";

import { infintyLoadPrompts } from "@/lib/validation/prompts_validation";

const promptsAppRouter = router({
  showAll: privateProcuder
    .input(infintyLoadPrompts)
    .query(async ({ ctx, input }) => {
      return await PromptController.showAll({ userId: ctx.auth.id, ...input });
    }),
});

export default promptsAppRouter;
