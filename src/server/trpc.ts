import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();

export const router = t.router;

export const publicProducer = t.procedure;

export const privateProcuder = publicProducer.use((opts) => {
  const { ctx } = opts;
  console.log(opts);

  return opts.next({
    ctx: {},
  });
});
