import { publicProducder, router } from "../trpc";

const appMessagesRouter = router({
  hello: publicProducder.query(() => "hello"),
});

export default appMessagesRouter;
