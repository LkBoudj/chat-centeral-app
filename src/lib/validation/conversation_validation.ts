import { z } from "zod";

export const deleteV = z.object({
  id: z.string().min(1, "the id is required"),
});
