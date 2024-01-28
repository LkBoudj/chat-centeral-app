import conversations from "./routers/conversation_router";
import authantication from "./routers/authantication_router";
import appMessagesRouter from "./routers/messages_router";
import technologyAppRouter from "./routers/technology_router";
import { router } from "./trpc";

export const appRouter = router({
  messages: appMessagesRouter,
  authantication,
  conversations,
  technology: technologyAppRouter,
});

export type AppRouter = typeof appRouter;
