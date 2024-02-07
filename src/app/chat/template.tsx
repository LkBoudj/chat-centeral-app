"use client";
import { ChatAside, IconButton, LkNavbar } from "@/components";
import UploadFile from "@/components/chat/UploadFile";
import ChatContextProvider from "@/components/context/ChatContextProvider";
import { authNavigation } from "@/lib/data/authNavigation";
import { useDisclosure } from "@nextui-org/react";
import { Settings } from "lucide-react";

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

      <ChatAside />

      <div className="bg-[#EEEEEE] h-screen">
        <LkNavbar
          navsData={authNavigation}
          endContent={
            <IconButton
              Icon={Settings}
              onClick={() => setShowAsideChat(!isShowAsideChat)}
              className=" lg:hidden "
            />
          }
        />
        {children}
      </div>
    </ChatContextProvider>
  );
};

export default ChatTemplate;
