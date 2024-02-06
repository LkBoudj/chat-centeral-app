"use client";
import { IconButton } from "@/components";
import UploadFile from "@/components/chat/UploadFile";
import ChatContextProvider, {
  chatContext,
} from "@/components/context/ChatContextProvider";
import { useDisclosure } from "@nextui-org/react";
import { Settings } from "lucide-react";
import { PropsWithChildren, useContext, useState } from "react";

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
      <IconButton
        Icon={Settings}
        onClick={() => setShowAsideChat(!isShowAsideChat)}
        className=" lg:hidden fixed right-10 top-[65px] z-50"
      />
      {children}
    </ChatContextProvider>
  );
};

export default ChatTemplate;
