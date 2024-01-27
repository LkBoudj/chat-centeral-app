import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";
import { absoluteUrl } from "@/lib/utlis";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: absoluteUrl("/api/trpc"),
    }),
  ],
});
