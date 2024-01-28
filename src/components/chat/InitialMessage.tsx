import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Bot } from "lucide-react";
import { ContainerMaxWind, Message } from "..";

const InitailtMessage = () => {
  return (
    <ContainerMaxWind className="w-full max-w-7xl mx-auto  pt-4  lg:pr-[370px]">
      <Message
        fromMachin={true}
        content={"Your first message will set the topic of our conversation."}
      />
    </ContainerMaxWind>
  );
};

export default InitailtMessage;
