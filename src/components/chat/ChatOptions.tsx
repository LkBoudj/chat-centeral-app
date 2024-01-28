import React, { useContext } from "react";
import ChatOptionsItem from "./ChatOptionsItem";
import {
  Card,
  CardBody,
  ScrollShadow,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { BrainCircuit, Cpu } from "lucide-react";
import { chatContext } from "../context/ChatContextProvider";
import { Technology } from "@prisma/client";

type Props = {};

const ChatOptions = (props: Props) => {
  const {
    technologies,
    selectdModelId,

    selectdTechnologyId,
    handelSelecteTechnology,
    modelsSelectedTech,

    hanldeSlectModel,
  } = useContext(chatContext);

  return (
    <Card
      shadow="none"
      className="bg-[#f7f7f7] ring-1 ring-gray-100 shadow-md w-full "
    >
      <CardBody>
        <ScrollShadow className="max-h-[450px] space-y-8">
          <ChatOptionsItem Icon={BrainCircuit} title={"Technologies"}>
            <Select
              size="sm"
              className="capitalize"
              selectedKeys={selectdTechnologyId}
              onChange={handelSelecteTechnology}
            >
              {technologies?.map((tech: Technology) => (
                <SelectItem key={tech.id}>{tech.name}</SelectItem>
              ))}
            </Select>
          </ChatOptionsItem>

          {modelsSelectedTech?.length ? (
            <ChatOptionsItem Icon={Cpu} title={"Models"}>
              <Select
                size="sm"
                selectionMode="single"
                selectedKeys={selectdModelId}
                onChange={hanldeSlectModel}
              >
                {modelsSelectedTech.map((model: string, index: number) => (
                  <SelectItem key={index} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </Select>
            </ChatOptionsItem>
          ) : (
            ""
          )}
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};

export default ChatOptions;
