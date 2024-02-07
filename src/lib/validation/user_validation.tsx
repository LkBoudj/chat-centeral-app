import { z } from "zod";

export const schemaUser = z.object({
  name: z.string().min(1, "the name is required"),
  email: z.string().min(1, "the name is required"),
  description: z.string().min(1, "the name is required"),
});
