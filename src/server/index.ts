import authantication from "./routers/authantication";
import appMessagesRouter from "./routers/messages_router";
import { router } from "./trpc";

export const appRouter = router({
  messages: appMessagesRouter,
  authantication,
});

export type AppRouter = typeof appRouter;
