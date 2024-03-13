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

type pronptContextResponce = {
  currentConversationId: number | null;
  setCurrentConversationId: (key?: any) => void;
};
export const pronptContext = createContext<any>(null);

const PronptContextProvider: React.FC<{
  outValue?: any;
  children: React.ReactNode;
}> = ({ children, outValue }) => {
  const { data: session, status } = useSession();
  const sessionUser = session?.user;

  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUloadFile,
    onClose,
  } = useDisclosure();

  const [copy, setCopy] = useState<boolean>(false);
  const { file, setFile } = useContext(globalContext);

  const [progress, setProgress] = useState(0);

  const handelSelectFile = (e: Media) => {
    setFile(e);
    onClose();
  };

  const value = {
    ...outValue,
    //--- session
    sessionUser,
    //---
    copy,
    // media
    file,
    setFile,
    progress,
    setProgress,
    onOpenUploadFile,
    onOpenChangeUloadFile,
  };
  return (
    <pronptContext.Provider value={value}>
      {isUploadFileOpen && (
        <UploadExplorer types={["image"]} handelSelectFile={handelSelectFile} />
      )}

      {children}
    </pronptContext.Provider>
  );
};

export default PronptContextProvider;
