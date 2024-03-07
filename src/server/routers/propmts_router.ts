import { schemCreateTechBack } from "@/lib/validation/technology_validation";
import { privateProcuder, router } from "../trpc";

import PromptController from "@/lib/controller/propmt_controller";

import {
  createPromptValidation,
  infintyLoadPrompts,
} from "@/lib/validation/prompts_validation";
import prismaConfig from "@/lib/configs/prismaConfig";

const promptsAppRouter = router({
  showAll: privateProcuder
    .input(infintyLoadPrompts)
    .query(async ({ ctx, input }) => {
      return await PromptController.showAll({ userId: ctx.auth.id, ...input });
    }),

  create: privateProcuder
    .input(createPromptValidation)
    .mutation(async ({ ctx, input }) => {
      const { title, excerpt, content, tags, technology } = input;
      const createPrompt = await prismaConfig.prompt.create({
        data: {
          userId: ctx.auth.id,
          content,
          excerpt,
          title,
          technologyId:
            technology == "all" || technology == null
              ? null
              : parseInt(technology),
          tags: input.tags.join(","),
        },
      });

      return { success: true };
    }),
});

export default promptsAppRouter;
