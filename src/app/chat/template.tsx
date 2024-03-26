"use client";
import { ChatAside, IconButton, LkNavbar } from "@/components";
import ChatContextProvider from "@/components/context/ChatContextProvider";
import { authNavigation } from "@/lib/data/authNavigation";
import useAside from "@/lib/hocks/conversation/useAside";

import { Settings } from "lucide-react";

import { PropsWithChildren } from "react";

const ChatTemplate = ({ children }: PropsWithChildren) => {
  const { toggleAside, isOpenAside, setIsOpenAside } = useAside();
  return (
    <ChatContextProvider
      outValue={{ toggleAside, isOpenAside, setIsOpenAside }}
    >
      <ChatAside />

      <div className="bg-[#EEEEEE] h-screen overflow-hidden  ">
        <LkNavbar
          navsData={authNavigation}
          endContent={
            <IconButton
              Icon={Settings}
              onClick={toggleAside}
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
