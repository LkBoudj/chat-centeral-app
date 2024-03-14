import { TRPCError, initTRPC } from "@trpc/server";
import { createContext } from "./context";

export const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;

export const publicProducer = t.procedure;

export const privateProuder = publicProducer.use((opts) => {
  const { ctx } = opts;
  if (!ctx?.auth) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "We don't take kindly to out-of-town folk",
    });
  }
  return opts.next();
});
