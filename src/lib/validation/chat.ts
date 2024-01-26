import { z } from "zod";

export const input = z.object({
  limit: z.number(),
  cursor: z.number().nullish(),
  skip: z.number().optional(),
});
