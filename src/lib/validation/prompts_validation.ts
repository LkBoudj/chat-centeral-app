import { z } from "zod";
import { inputInfinte } from "./gloab";

export const infintyLoadPrompts = inputInfinte.merge(
  z.object({ search: z.string() })
);

export type InputsInfintyLoadPrompts = z.infer<typeof infintyLoadPrompts>;
