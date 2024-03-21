"use client";
import { CreateMessage } from "@/components";

import { Spinner } from "@nextui-org/react";
import ListOfMessages from "@/components/chat/ListOfMessages";

import useMessages from "@/lib/hocks/message/useMessages";

const ConversationPage = () => {
  const { allMessages, isLoading, isSuccess } = useMessages();

  return (
    <>
      {isLoading ? (
        <div className="chat-area flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {isSuccess && <ListOfMessages messages={allMessages} />}

          <CreateMessage />
        </>
      )}
    </>
  );
};

export default ConversationPage;

/*



*/
