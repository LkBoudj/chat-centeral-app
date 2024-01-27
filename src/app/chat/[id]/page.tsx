"use client";
import { ChatAside, CreateMessage, LkNavbar } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";
import { Spinner } from "@nextui-org/react";
import ListOfMessages from "@/components/chat/ListOfMessages";
import { useContext } from "react";
import { chatContext } from "@/components/context/ChatContextProvider";

type Props = {
  params: { id: string };
};

const ConversationPage = ({ params }: Props) => {
  const { isLoading, toShow, isSuccessLoading } = useContext(chatContext);
  return (
    <div className=" w-full h-screen  bg-[#EEEEEE]">
      <ChatAside />
      <LkNavbar navsData={authNavigation} />

      {isLoading && (
        <div className="chat-area flex h-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {isSuccessLoading && <ListOfMessages messages={toShow} />}
      <CreateMessage />
    </div>
  );
};

export default ConversationPage;
