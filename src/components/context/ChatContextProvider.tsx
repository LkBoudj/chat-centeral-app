"use client";
import { useInfiniteConversation } from "@/lib/hocks";
import { trpc } from "@/trpc/client";
import { Conversation } from "@prisma/client";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

type ChatContextResponce = {
  converstion: Conversation[];
  isSuccess?: boolean;
  handelNextPage: () => void;
  handlePreviousPage: () => void;
  page: number;
  isHaveNext?: boolean;
};
export const chatContext = createContext<ChatContextResponce>({
  page: 1,
  converstion: [],
  handelNextPage: () => {},
  handlePreviousPage: () => {},
  isSuccess: false,
  isHaveNext: false,
});

const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const {
    handelNextPage,
    handlePreviousPage,
    page,
    isSuccess,
    isHaveNext,
    items: converstion,
  } = useInfiniteConversation();
  const value = {
    converstion,
    isSuccess,
    page,
    handelNextPage,
    isHaveNext,
    handlePreviousPage,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
