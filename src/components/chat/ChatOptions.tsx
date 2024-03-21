import React, { useContext } from "react";
import ChatOptionsItem from "./ChatOptionsItem";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { BrainCircuit, Cpu } from "lucide-react";
import { chatContext } from "../context/ChatContextProvider";
import { SelecteModel, TechnologySelect } from "..";

type Props = {};

const ChatOptions = (props: Props) => {
  const { modelsSelectedTech } = useContext(chatContext);

  return (
    <Card
      shadow="none"
      className="bg-[#f7f7f7] ring-1 ring-gray-100 shadow-md w-full "
    >
      <CardBody>
        <ScrollShadow className="max-h-[750px] space-y-8 pb-2">
          <ChatOptionsItem Icon={BrainCircuit} title={"Technologies"}>
            <TechnologySelect />
          </ChatOptionsItem>
          <ChatOptionsItem Icon={BrainCircuit} title={"Models"}>
            {modelsSelectedTech?.length ? <SelecteModel /> : "No Models"}
          </ChatOptionsItem>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};

export default ChatOptions;
