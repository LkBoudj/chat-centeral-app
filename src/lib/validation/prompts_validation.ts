import { z } from "zod";
import { inputInfinte } from "./gloab";

export const infintyLoadPrompts = inputInfinte.merge(
  z.object({
    search: z.string(),
    myPrompts: z.boolean().default(false),
    tags: z.array(z.string()),
    techId: z
      .any()
      .default("0")
      .transform((data) => {
        if (isNaN(data)) return 0;
        return parseInt(data);
      }),
  })
);

const inputValidation = infintyLoadPrompts.merge(
  z.object({ userId: z.string() })
);
export type InputsInfintyLoadPrompts = z.infer<typeof inputValidation>;
