import { z } from "zod";
import { inputInfante } from "./gloab";

export const createCommentSchema = z.object({
  promptId: z.number(),
  content: z.string(),
});

export const allCommentPromptSchema = inputInfante.merge(
  z.object({
    promptId: z.number(),
  })
);
export const allCommentPromptSchemaInfinity = allCommentPromptSchema.merge(
  z.object({
    userId: z.string(),
  })
);

export type createCommentSchemaInput = z.infer<typeof createCommentSchema>;

export type allCommentPromptSchemaInfinityPrompts = z.infer<
  typeof allCommentPromptSchemaInfinity
>;
