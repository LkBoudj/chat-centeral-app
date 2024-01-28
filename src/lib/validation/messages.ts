import { z } from "zod";

export const conversationMessagesV = z.object({
  id: z.string().min(1, "slug is required"),
});

export const createNewMessageFrontV = z.object({
  conversationId: z.string().nullish(),
  content: z.string().min(1, "the content is required"),
});

export const createNewMessageBackV = z.object({
  conversationId: z.string().nullish(),
  technologyId: z.number().min(1, "the content is required"),
  content: z.string().min(1, "the content is required"),
});
