import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { chatContext } from "../context/ChatContextProvider";
import { Technology } from "@prisma/client";

type Props = {};

const TehcnologoySelect = (props: Props) => {
  const { technologies, selectTechnology, handelSelecteTechnology } =
    useContext(chatContext);
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div className="w-full max-w-[80px] flex items-center space-x-1 text-sm">
          <div>
            <Avatar
              name={selectTechnology?.name}
              className="w-6 h-6"
              size="sm"
              src={selectTechnology?.logo ?? ""}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="truncate whitespace-normal">
              {selectTechnology?.name ?? ""}
            </p>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        {technologies?.map((tech: Technology, index: number) => {
          return (
            <DropdownItem
              key={`${index}_${tech?.name}`}
              onClick={() => handelSelecteTechnology(tech)}
              className="h-14 gap-2"
            >
              <div className="w-full flex items-center space-x-1 text-sm">
                <Avatar
                  name={tech?.name}
                  className="w-6 h-6"
                  size="sm"
                  src={tech?.logo ?? ""}
                />

                <span>{tech?.name ?? ""}</span>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TehcnologoySelect;
