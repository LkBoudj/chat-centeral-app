import { router, privateProcuder, publicProducer } from "../trpc";
import prismaConfig from "@/lib/configs/prismaConfig";

import { input } from "@/lib/validation/chat";

const conversationsAppRouter = router({
  infiniteChats: publicProducer.input(input).query(async ({ ctx, input }) => {
    const { limit, skip, cursor } = input;
    const posts = await prismaConfig.conversation.findMany({
      take: limit + 1,
      skip,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: "desc",
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;
    const sortedPosts = posts.sort(function (p1, p2) {
      if (p1.id < p2.id) return -1;
      if (p1.id > p2.id) return 1;
      return 0;
    });
    if (sortedPosts.length > limit) {
      const nextItem = sortedPosts[0]; // return the last item from the array
      nextCursor = nextItem?.id;
    }
    return {
      ietms: sortedPosts,
      nextCursor,
    };
  }),
});

export default conversationsAppRouter;
