"use client";
import { ChatAside, CreateMessage, LkNavbar } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";
import { ScrollShadow } from "@nextui-org/react";
import ListOfMessages from "@/components/chat/ListOfMessages";

type Props = {};

const ConversationPage = (props: Props) => {
  return (
    <div className=" w-full h-screen  bg-[#EEEEEE]">
      <ChatAside />
      <LkNavbar navsData={authNavigation} />
      <ScrollShadow
        isEnabled={false}
        className="w-full  pr-[370px] h-screen chat-area "
      >
        <ListOfMessages />
      </ScrollShadow>
      <CreateMessage />
    </div>
  );
};

export default ConversationPage;
