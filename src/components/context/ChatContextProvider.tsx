"use client";

import { limit_infinite_messagess } from "@/lib/configs/infinte_scrolle_config";
import { useConversationHock } from "@/lib/hocks";
import useMessageHoock from "@/lib/hocks/message/useMessageHoock";
import useFrontTechnology from "@/lib/hocks/technology/useFrontTechnology";
import { useDisclosure } from "@nextui-org/react";
import { Media } from "@prisma/client";
import { useSession } from "next-auth/react";

import React, { createContext, useContext, useEffect, useState } from "react";
import UploadExplorer from "../global/explorer/UploadExplorer";
import { globalContext } from "./GolobalContextProvider";

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
  const { data: session, status } = useSession();
  const sessionUser = session?.user;
  const {
    hanldeSlectModel,
    selectTechnology,
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

  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUloadFile,
    onClose,
  } = useDisclosure();

  const [copy, setCopy] = useState<boolean>(false);
  const { file, setFile } = useContext(globalContext);

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

  const handelSelectFile = (e: Media) => {
    setFile(e);
    onClose();
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
    //--- session
    sessionUser,
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
    selectTechnology,
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
    onOpenUploadFile,
    onOpenChangeUloadFile,
  };
  return (
    <chatContext.Provider value={value}>
      {isUploadFileOpen && (
        <UploadExplorer
          types={["image", "audio", "pdf"]}
          handelSelectFile={handelSelectFile}
        />
      )}

      {children}
    </chatContext.Provider>
  );
};

export default ChatContextProvider;
