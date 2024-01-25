import appMessagesRouter from "./routers/messages_router";
import { publicProducder, router } from "./trpc";

export const appRouter = router({
  messages: appMessagesRouter,
});

export type AppRouter = typeof appRouter;
