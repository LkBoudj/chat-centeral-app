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
import React, { useEffect, useState } from "react";
import ChatOptionsItem from "../chat/ChatOptionsItem";
import { BrainCircuit, SlidersHorizontal } from "lucide-react";
import IconButton from "../global/IconButton";
import useTech from "@/lib/hocks/technology/useTech";
import { Technology } from "@prisma/client";
import CustomInputTags from "../global/CustomInputTags";

type Props = {
  handelSelectTech: (key: any) => void;
  slectedTech: string;
  className?: string;
  myPrompts?: boolean;
  setMyPrompts: (key: any) => void;
  techs: any[];
  valueTage: any;
  setValueTage: (key: any) => void;
  onOpen?: () => void;
};

const AsidePrompts = ({
  handelSelectTech,
  slectedTech,
  className,
  techs,
  myPrompts,
  setMyPrompts,
  valueTage,
  setValueTage,
  onOpen,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tags, seTtags] = useState<any>([]);

  const getAllTags = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/tags`, {
      method: "GET",
    });

    if (res.ok) {
      const json = await res.json();
      console.log(json);
      const myTags = json.data.map((tag: any) => tag.name);
      seTtags(myTags);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      getAllTags();
    }
  }, [isLoading]);
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
          <Switch
            size="sm"
            isSelected={myPrompts}
            onValueChange={setMyPrompts}
          />
        </ChatOptionsItem>
        <ChatOptionsItem Icon={BrainCircuit} title={"Technologies"}>
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

        <ChatOptionsItem Icon={BrainCircuit} title={"Technologies"}>
          <CustomInputTags
            data={tags}
            onChange={(e) => {
              setValueTage(e);
            }}
            value={valueTage}
          />
        </ChatOptionsItem>
      </div>
    </aside>
  );
};

export default AsidePrompts;
