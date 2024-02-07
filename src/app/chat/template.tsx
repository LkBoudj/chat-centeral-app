"use client";
import { IconButton } from "@/components";
import UploadFile from "@/components/chat/UploadFile";
import ChatContextProvider from "@/components/context/ChatContextProvider";
import { useDisclosure } from "@nextui-org/react";

import { PropsWithChildren, useState } from "react";

const ChatTemplate = ({ children }: PropsWithChildren) => {
  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUloadFile,
  } = useDisclosure();
  const [isShowAsideChat, setShowAsideChat] = useState<boolean>(false);
  return (
    <ChatContextProvider
      outValue={{
        isUploadFileOpen,
        onOpenUploadFile,
        onOpenChangeUloadFile,
        isShowAsideChat,
        setShowAsideChat,
      }}
    >
      <UploadFile
        isOpen={isUploadFileOpen}
        onOpen={onOpenUploadFile}
        onOpenChange={onOpenChangeUloadFile}
      />

      {children}
    </ChatContextProvider>
  );
};

export default ChatTemplate;
