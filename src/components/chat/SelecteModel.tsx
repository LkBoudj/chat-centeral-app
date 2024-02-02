import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { chatContext } from "../context/ChatContextProvider";
import { Technology } from "@prisma/client";

type Props = {};

const SelecteModel = (props: Props) => {
  const {
    modelsSelectedTech,
    selectdTechnology,
    selectdModel,
    hanldeSlectModel,
  } = useContext(chatContext);
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div className="flex items-center space-x-1 text-sm">
          <Avatar
            name={selectdModel}
            className="w-6 h-6"
            size="sm"
            src={selectdTechnology?.logo ?? ""}
          />

          <span>{selectdModel ?? ""}</span>
        </div>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        {modelsSelectedTech?.map((model: string, index: number) => {
          return (
            <DropdownItem
              key={`${index}_${model}`}
              onClick={() => hanldeSlectModel(model)}
              className="h-14 gap-2"
            >
              <div className="w-full flex items-center space-x-1 text-sm">
                <Avatar
                  name={model}
                  className="w-6 h-6"
                  size="sm"
                  src={selectdTechnology?.logo ?? ""}
                />

                <span>{model ?? ""}</span>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SelecteModel;
