import { messsagesData } from "@/lib/data/chats";
import { ContainerMaxWind, Message } from "..";
import { Message as MessageType } from "@prisma/client";
import { ScrollShadow } from "@nextui-org/react";
import InitailtMessage from "./InitialMessage";

const ListOfMessages = ({ messages }: { messages: any[] }) => {
  return (
    <ScrollShadow
      isEnabled={false}
      className="w-full  lg:pr-[370px]  h-screen chat-area "
    >
      <ContainerMaxWind className="w-full max-w-7xl mx-auto flex flex-col pt-4 space-y-4">
        {messages?.length ? (
          messages?.map((message: MessageType) => (
            <Message
              key={message.id}
              content={message?.content}
              formMachin={message.fromMachin ?? false}
            />
          ))
        ) : (
          <InitailtMessage />
        )}
      </ContainerMaxWind>
    </ScrollShadow>
  );
};

export default ListOfMessages;
