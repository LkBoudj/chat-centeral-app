import { z } from "zod";

export const inputInfante = z.object({
  limit: z.number(),
  cursor: z.any().nullish(),
  skip: z.number().optional(),
});
