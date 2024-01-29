"use client";
import UploadFile from "@/components/chat/UploadFile";
import ChatContextProvider from "@/components/context/ChatContextProvider";
import { useDisclosure } from "@nextui-org/react";
import { PropsWithChildren } from "react";

const ChatTemplate = ({ children }: PropsWithChildren) => {
  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUloadFile,
  } = useDisclosure();
  return (
    <ChatContextProvider
      outValue={{ isUploadFileOpen, onOpenUploadFile, onOpenChangeUloadFile }}
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
