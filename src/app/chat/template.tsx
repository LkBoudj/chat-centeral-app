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
      <div className="fixed z-50 top-0 left-0 bg-red-600 text-white">
        {process.env.NODE_ENV == "production" ? (
          <div>You are in production mode</div>
        ) : (
          <div>You are in devement mode</div>
        )}
      </div>
      {children}
    </ChatContextProvider>
  );
};

export default ChatTemplate;
