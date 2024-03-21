"use client";

import { useConversationHock } from "@/lib/hocks";

import useFrontTechnology from "@/lib/hocks/technology/useFrontTechnology";

import { useSession } from "next-auth/react";

import React, { createContext, useState } from "react";

export const chatContext = createContext<any>(null);

const ChatContextProvider = ({
  children,
  outValue,
}: {
  outValue?: any;
  children: React.ReactNode;
}) => {
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const sessionUser = session?.user;
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("");

  const {
    hanldeSlectModel,
    selectTechnology,
    handelSelectedTechnology,
    selectedModel,
    modelsSelectedTech,
    loadTechsSuccess,
    technologies,
  } = useFrontTechnology();

  const {
    handelNextPageC,
    handlePreviousPageC,
    pageC,
    isSuccessC,
    isHaveNextC,
    chats,
    handelDeleteConversation,
    setChats,
  } = useConversationHock();

  const handelTextToCopy = (textToCopy: any) => {
    // navigator.clipboard
    //   .writeText(textToCopy)
    //   .then(() => {
    //     setTimeout(() => {
    //     }, 1000);
    //   })
    //   .catch(() => {});
  };

  const value = {
    ...outValue,
    allMessages,
    setAllMessages,
    //--- session
    sessionUser,
    //---
    handelTextToCopy,
    //----------messages -------------
    setCurrentConversationId,
    //--------- converaation ----------
    handelDeleteConversation,
    handelNextPageC,
    handlePreviousPageC,
    pageC,
    isSuccessC,
    isHaveNextC,
    chats,
    setChats,
    //--------- technology ----------
    hanldeSlectModel,
    selectTechnology,
    handelSelectedTechnology,
    selectedModel,
    modelsSelectedTech,
    loadTechsSuccess,
    technologies,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
