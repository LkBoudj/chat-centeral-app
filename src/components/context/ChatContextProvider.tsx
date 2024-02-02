"use client";

import { useConversationHock } from "@/lib/hocks";
import useFrontTechnology from "@/lib/hocks/useFrontTechnology";
import { Media } from "@prisma/client";

import React, { createContext, useState } from "react";

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

  const { handelDeleteConversation } = useConversationHock();

  const [file, setFile] = useState<Media>();
  const [progress, setProgress] = useState(0);
  const value = {
    ...outValue,
    //--------- converaation ----------
    handelDeleteConversation,
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
