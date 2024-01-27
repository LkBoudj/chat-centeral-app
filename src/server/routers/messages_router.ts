import {
  conversationMessagesV,
  createNewMessageV,
  inputInfinte,
} from "@/lib/validation";
import { privateProcuder, router } from "../trpc";
import prismaConfig from "@/lib/configs/prismaConfig";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { ConversationController, MessageController } from "@/lib/controller";
const appMessagesRouter = router({
  infiniteConversationMessages: privateProcuder
    .input(inputInfinte)
    .input(conversationMessagesV)
    .query(async ({ input, ctx }) => {
      const { limit, skip, cursor, id } = input;
      return MessageController.infintyLoad({
        cursor,
        limit,
        skip,
        conversationId: id,
        userId: ctx.auth.id,
      });
    }),

  create: privateProcuder
    .input(createNewMessageV)
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

      const newMessage = await MessageController.create({
        content,
        conversationId: conversationId as string,
        technologyId: 1,
        userId: ctx.auth.id,
      });

      return newMessage;
    }),
});

export default appMessagesRouter;
