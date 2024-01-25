import NextAuth from "next-auth";
import { nextOption } from "@/lib/configs/nextAuthOption";

const handler = NextAuth(nextOption);

export { handler as GET, handler as POST };
