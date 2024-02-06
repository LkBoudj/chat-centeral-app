"use client";

import { limit_infinite_messagess } from "@/lib/configs/infinte_scrolle_config";
import { useConversationHock } from "@/lib/hocks";
import useMessageHoock from "@/lib/hocks/message/useMessageHoock";
import useFrontTechnology from "@/lib/hocks/technology/useFrontTechnology";
import { Media } from "@prisma/client";

import React, { createContext, useEffect, useState } from "react";

type ChatContextResponce = {
  currentConversationId: number | null;
  setCurrentConversationId: (key?: any) => void;
};
export const chatContext = createContext<any>(null);

const ChatContextProvider = ({
  children,
  outValue,
}: {
  outValue?: any;
  children: React.ReactNode;
}) => {
  const {
    hanldeSlectModel,
    selectdTechnology,
    handelSelecteTechnology,
    selectdModel,
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

  const [copy, setCopy] = useState<boolean>(false);
  const [file, setFile] = useState<Media>();
  const [progress, setProgress] = useState(0);

  const handelTextToCopy = (textToCopy: any) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      })
      .catch(() => {});
  };

  const {
    setCurrentConversationId,
    messages,
    setMessages,
    isSuccess: isSuccessM,
    isLoading: isLoadingM,
  } = useMessageHoock();
  const value = {
    ...outValue,

    //---
    handelTextToCopy,
    copy,
    //----------messages -------------
    setCurrentConversationId,
    messages,
    isSuccessM,
    isLoadingM,
    setMessages,
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
    selectdTechnology,
    handelSelecteTechnology,
    selectdModel,
    modelsSelectedTech,
    loadTechsSuccess,
    technologies,
    // media
    file,
    setFile,
    progress,
    setProgress,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
