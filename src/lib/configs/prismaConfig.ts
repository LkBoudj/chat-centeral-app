import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const prismaConfig = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaConfig;

export default prismaConfig;
