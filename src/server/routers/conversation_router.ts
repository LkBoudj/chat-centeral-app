import { router, privateProcuder } from "../trpc";
import prismaConfig from "@/lib/configs/prismaConfig";

import { inputInfinte } from "@/lib/validation/";

const conversationsAppRouter = router({
  infiniteChats: privateProcuder
    .input(inputInfinte)
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input;
      const items = await prismaConfig.conversation.findMany({
        take: limit + 1,
        skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      const sorteditems = items.sort(function (p1, p2) {
        if (p1.id < p2.id) return -1;
        if (p1.id > p2.id) return 1;
        return 0;
      });
      if (sorteditems.length > limit) {
        const nextItem = sorteditems[0]; // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        ietms: items,
        nextCursor,
      };
    }),
});

export default conversationsAppRouter;
