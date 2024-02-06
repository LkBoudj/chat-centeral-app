import {
  conversationMessagesV,
  createNewMessageBackV,
  inputInfinte,
} from "@/lib/validation";
import { privateProcuder, router } from "../trpc";

import { TRPCError } from "@trpc/server";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { ConversationController, MessageController } from "@/lib/controller";
import TechnologiesContainer from "@/lib/technolgie_container";
import { z } from "zod";
const appMessagesRouter = router({
  infiniteConversationMessages: privateProcuder
    .input(inputInfinte)
    .input(conversationMessagesV)
    .query(async ({ input, ctx }) => {
      const { limit, skip, cursor, id } = input;
      return MessageController.all({
        conversationId: id,
        userId: ctx.auth.id,
      });
    }),
  all: privateProcuder
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id } = input;
      return await MessageController.all({
        conversationId: id,
        userId: ctx.auth.id,
      });
    }),
  create: privateProcuder
    .input(createNewMessageBackV)
    .use(async ({ next, ctx, input }) => {
      const { conversationId, content } = input;

      if (!conversationId) {
        const newConversation: any = await ConversationController.create({
          title: content,
          userId: ctx.auth.id,
        });
        input.conversationId = newConversation?.id;
      } else {
        const isExits = await ConversationController.isExits({
          userId: ctx.auth.id,
          id: conversationId,
        });
        if (!isExits) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: CONVARSATION_NOT_FOUND,
            cause: "theError",
          });
        }
      }

      return next({
        ctx,
        input,
      });
    })
    .mutation(async ({ input, ctx }) => {
      const { content, conversationId } = input;

      const userMessage: AppMessage = {
        content,
        conversationId: conversationId as string,
        technologyId: 1,
        userId: ctx.auth.id,
      };
      await MessageController.create(userMessage);

      return await TechnologiesContainer.generateTextCompletion({
        userMessage,
      });
    }),
});

export default appMessagesRouter;
