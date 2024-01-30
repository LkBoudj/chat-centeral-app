import { ContainerMaxWind, Message } from "..";

import { ScrollShadow } from "@nextui-org/react";
import InitailtMessage from "./InitialMessage";

const ListOfMessages = ({ messages }: { messages?: any[] }) => {
  return (
    <ScrollShadow
      isEnabled={false}
      className="w-full  lg:pr-[370px]  h-screen chat-area "
    >
      <ContainerMaxWind className="w-full max-w-7xl mx-auto flex flex-col pt-4 space-y-4 px-5">
        {messages?.length ? (
          messages?.map((message: any, index: number) => (
            <Message
              technology={message.technology}
              key={index}
              id={message?.id}
              content={message?.content}
              fromMachin={message?.fromMachin ?? false}
              media={message?.media}
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
