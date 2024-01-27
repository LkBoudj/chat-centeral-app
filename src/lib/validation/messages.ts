import { z } from "zod";

export const conversationMessagesV = z.object({
  id: z.string().min(1, "slug is required"),
});

export const createNewMessageV = z.object({
  conversationId: z.string().nullish(),
  content: z.string().min(1, "the content is required"),
});
