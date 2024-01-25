import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { Adapter } from "next-auth/adapters";
import prismaConfig from "./prismaConfig";

import { User } from "@prisma/client";
import { comparePassword } from "../helper";

export const nextOption: NextAuthOptions = {
  adapter: PrismaAdapter(prismaConfig) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user: any = await prismaConfig.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;
        const isValid = await comparePassword(
          credentials?.password as string,
          user.password
        );
        if (isValid) return user;

        return null;
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      const dataUser: User | any = await prismaConfig.user.findUnique({
        where: {
          email: token?.email as string,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          roles: true,
          stripeCustomerId: true,
          stripeSubscriptionId: true,
          stripePriceId: true,
          SubscriptionExpirydate: true,
          msgCounter: true,
          messagesMax: true,
        },
      });
      if (dataUser) {
        let isSubscriptionActive = true;
        const today = new Date();

        isSubscriptionActive =
          new Date(dataUser.SubscriptionExpirydate as string) >= today;

        const remaining = dataUser.messagesMax - dataUser.msgCounter;

        token.user = { ...dataUser, remaining, isSubscriptionActive };
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user = (await token.user) as User;
      return session;
    },
  },
};

export const getAuthSession = async () => {
  return await getServerSession(nextOption);
};
