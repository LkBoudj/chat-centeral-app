"use client";
import { ChatAside, IconButton, LkNavbar, UploadExplorer } from "@/components";
import ChatContextProvider from "@/components/context/ChatContextProvider";
import FileManager from "@/components/global/explorer/FileManager";
import { authNavigation } from "@/lib/data/authNavigation";

import { Settings } from "lucide-react";

import { PropsWithChildren, useState } from "react";

const ChatTemplate = ({ children }: PropsWithChildren) => {
  const [isShowAsideChat, setShowAsideChat] = useState<boolean>(false);

  return (
    <ChatContextProvider>
      <ChatAside />

      <div className="bg-[#EEEEEE] h-screen overflow-hidden  ">
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
        <div className="h-full w-full  max-h-[var(--full-minus-header)] p-4  flex flex-col justify-between">
          {children}
        </div>
      </div>
    </ChatContextProvider>
  );
};

export default ChatTemplate;
