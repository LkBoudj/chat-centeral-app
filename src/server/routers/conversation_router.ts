import { router, privateProuder } from "../trpc";
import prismaConfig from "@/lib/configs/prismaConfig";
import { ConversationController } from "@/lib/controller";

import { inputInfante } from "@/lib/validation/";
import { deleteV } from "@/lib/validation/conversation_validation";

const conversationsAppRouter = router({
  infiniteChats: privateProuder
    .input(inputInfante)
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input;

      return ConversationController.infinityLoad({
        limit: limit,
        cursor,
        userId: ctx.auth.id,
        skip,
      });
    }),
  delete: privateProuder.input(deleteV).mutation(async ({ ctx, input }) => {
    const { id } = input;

    await ConversationController.delete({ id, userId: ctx.auth.id });
  }),
});

export default conversationsAppRouter;
