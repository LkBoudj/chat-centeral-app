"use client";
import { CreateMessage } from "@/components";
import ListOfMessages from "@/components/chat/ListOfMessages";
import InitialMessage from "@/components/chat/InitialMessage";

import useMessages from "@/lib/hocks/message/useMessages";
import { useContext } from "react";
import { chatContext } from "@/components/context/ChatContextProvider";

type Props = {};

const ChatPage = (props: Props) => {
  const { allMessages } = useContext(chatContext);
  return (
    <>
      {allMessages.length ? (
        <ListOfMessages messages={allMessages} />
      ) : (
        <InitialMessage />
      )}

      <CreateMessage />
    </>
  );
};

export default ChatPage;
