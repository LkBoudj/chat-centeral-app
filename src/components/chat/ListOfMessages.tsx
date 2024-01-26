import { messsagesData } from "@/lib/data/chats";
import { ContainerMaxWind, Message } from "..";

const ListOfMessages = () => {
  return (
    <ContainerMaxWind className="w-full max-w-7xl mx-auto flex flex-col pt-4 space-y-4">
      {messsagesData.map((message: any, index) => (
        <Message
          key={index}
          content={message?.content}
          formMachin={message?.formMachin}
        />
      ))}
    </ContainerMaxWind>
  );
};

export default ListOfMessages;
