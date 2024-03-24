import { z } from "zod";
import { inputInfante } from "./gloab";
import { ACCEPTED_IMAGE_MIME_TYPES } from "../configs/validition_config";

export const infinityLoadPrompts = inputInfante.merge(
  z.object({
    search: z.string(),
    myPrompts: z.boolean().default(false),
    tags: z.string().nullable().nullish(),
    techId: z
      .any()
      .default("0")
      .transform((data) => {
        if (isNaN(data)) return 0;
        return parseInt(data);
      }),
  })
);

export const createPromptValidation = z.object({
  image: z.string().nullable().nullish(),
  title: z
    .string()
    .trim()
    .min(1, {
      message: "Can't be empty!",
    })
    .trim()
    .max(120, {
      message: "Must not exceed 120 characters",
    })
    .toLowerCase(),
  excerpt: z
    .string()
    .trim()
    .max(191, {
      message: "Must not exceed 191 characters",
    })
    .min(1, {
      message: "Can't be empty!",
    })
    .trim()
    .toLowerCase(),
  content: z
    .string()
    .trim()

    .min(1, {
      message: "Can't be empty!",
    })
    .trim()
    .toLowerCase(),
  tags: z.array(z.string()).nullable().nullish(),
  technology: z.string().trim().nullable(),
});

const inputValidation = infinityLoadPrompts.merge(
  z.object({ userId: z.string() })
);
export type InputsInfintyLoadPrompts = z.infer<typeof inputValidation>;
