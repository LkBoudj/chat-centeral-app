"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Select,
  SelectItem,
  Switch,
  cn,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import ChatOptionsItem from "../chat/ChatOptionsItem";
import { BrainCircuit, SlidersHorizontal } from "lucide-react";
import IconButton from "../global/IconButton";
import useTech from "@/lib/hocks/technology/useTech";
import { Technology } from "@prisma/client";

type Props = {
  handelSelectTech: (key: any) => void;
  slectedTech: string;
  className?: string;
  techs: any[];
};

const AsidePrompts = ({
  handelSelectTech,
  slectedTech,
  className,
  techs,
}: Props) => {
  return (
    <aside
      className={cn(
        `fixed lef-0 top-0 pt-20 h-full transition-all duration-100  w-full  transform   z-40 max-w-[370px] bg-white p-4 `,
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <p className="flex items-center space-x-1 font-bold text-[13px]">
          <BrainCircuit size={17} /> <span> Filter </span>
        </p>
        <IconButton Icon={SlidersHorizontal} size={17} />
      </div>
      <Divider className="my-6" />
      <div className="space-y-8">
        <ChatOptionsItem Icon={BrainCircuit} title={"My Prompts"}>
          <Switch size="sm" />
        </ChatOptionsItem>
        <ChatOptionsItem Icon={BrainCircuit} title={"Technologies"}>
          {/* <Select
            size="sm"
            variant="bordered"
            label="Technologies"
            className="max-w-xs"
            onChange={(e) => handelSelectTech(e.target.value)}
            selectedKeys={slectedTech ? [slectedTech] : []}
          >
            {techs?.map((item: Technology) => (
              <SelectItem key={item?.id} value={item?.name}>
                {item?.name}
              </SelectItem>
            ))}
          </Select> */}

          <Autocomplete
            size="sm"
            variant="bordered"
            label="Technologies"
            className="max-w-xs"
            onSelectionChange={handelSelectTech}
          >
            {techs?.map((item: Technology) => (
              <AutocompleteItem key={item?.id} value={item?.name}>
                {item?.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </ChatOptionsItem>
      </div>
    </aside>
  );
};

export default AsidePrompts;
