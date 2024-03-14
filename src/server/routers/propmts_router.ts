import { privateProuder as privateProuder, router } from "../trpc";
var slugify = require("slugify");
import PromptController from "@/lib/controller/propmt_controller";

import {
  createPromptValidation,
  infinityLoadPrompts as infinityLoadPrompts,
} from "@/lib/validation/prompts_validation";
import prismaConfig from "@/lib/configs/prismaConfig";
import { z } from "zod";

const promptsAppRouter = router({
  showAll: privateProuder
    .input(infinityLoadPrompts)
    .query(async ({ ctx, input }) => {
      return await PromptController.showAll({ userId: ctx.auth.id, ...input });
    }),

  create: privateProuder
    .input(
      createPromptValidation.merge(
        z.object({ tags: z.string().nullable().nullish() })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { title, excerpt, content, tags, technology, image } = input;
      const userId = ctx.auth.id;
      const slug = slugify(title + userId + Date.now(), {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      const createPrompt = await prismaConfig.prompt.create({
        data: {
          slug,
          userId,
          content,
          excerpt,
          title,
          technologyId:
            technology == "all" || technology == null
              ? null
              : parseInt(technology),
          tags,
          image: image ?? null,
        },
      });

      return { success: true };
    }),
  update: privateProuder
    .input(
      createPromptValidation.merge(
        z.object({ tags: z.string().nullable().nullish(), id: z.number() })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, excerpt, content, tags, technology, image } = input;
      const userId = ctx.auth.id;
      const slug = slugify(title + userId + Date.now(), {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });

      const technologyId =
        technology == "all" || technology == null ? null : parseInt(technology);
      try {
        const update = await prismaConfig.prompt.update({
          data: { title, excerpt, content, tags, image, technologyId },

          where: {
            id,
            userId,
          },
        });

        return update.id ?? null;
      } catch (e) {
        console.log(e);
      }
    }),
  delete: privateProuder
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const prompt: any = await prismaConfig.prompt.delete({
        where: {
          id: input.id,
          userId: ctx.auth.id,
        },
      });

      if (prompt?.id) return { success: true, id: prompt.id };

      return { success: false, id: null };
    }),
});

export default promptsAppRouter;
