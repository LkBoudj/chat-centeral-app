"use client";

import { useConversationHock } from "@/lib/hocks";
import useFrontTechnology from "@/lib/hocks/useFrontTechnology";

import { PropsWithChildren, createContext } from "react";

type ChatContextResponce = {
  currentConversationId: number | null;
  setCurrentConversationId: (key?: any) => void;
};
export const chatContext = createContext<any>(null);

const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const {
    hanldeSlectModel,
    selectdModelId,
    selectdTechnology,
    handelSelecteTechnology,
    selectdModel,
    selectdTechnologyId,
    modelsSelectedTech,
    loadTechsSuccess,
    technologies,
  } = useFrontTechnology();

  const { handelDeleteConversation } = useConversationHock();
  const value = {
    //--------- converaation ----------
    handelDeleteConversation,
    //--------- technology ----------
    hanldeSlectModel,
    selectdModelId,
    selectdTechnology,
    handelSelecteTechnology,
    selectdModel,
    selectdTechnologyId,
    modelsSelectedTech,
    loadTechsSuccess,
    technologies,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
