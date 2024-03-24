"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Switch,
  cn,
} from "@nextui-org/react";
import React, { useContext } from "react";
import ChatOptionsItem from "../chat/ChatOptionsItem";
import { BrainCircuit, SlidersHorizontal } from "lucide-react";
import IconButton from "../global/IconButton";
import { Technology } from "@prisma/client";
import CustomInputTags from "../global/CustomInputTags";
import useTags from "@/lib/hocks/prompts/useTags";
import { promptContext } from "../context/PromptContextProvider";

interface Props extends React.ComponentPropsWithRef<"aside"> {}
const AsidePrompts = ({ className }: Props) => {
  const { tags } = useTags();

  const {
    myPrompts,
    setMyPrompts,
    setSelected,
    valueTags,
    setValueTags,
    techs,
    isOpenAside,
    toggleAside,
  } = useContext(promptContext);
  return (
    <aside
      className={cn(
        `fixed lef-0 top-0 pt-20 h-full  duration-100  w-full  transform   z-40 max-w-[370px] bg-white p-4 `,
        className,
        !isOpenAside ? "translate-x-0" : "-translate-x-full "
      )}
    >
      <div className="flex w-full items-center justify-between">
        <p className="flex items-center space-x-1 font-bold text-[13px]">
          <BrainCircuit size={17} /> <span> Filter </span>
        </p>
        <IconButton onClick={toggleAside} Icon={SlidersHorizontal} size={17} />
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
            onSelectionChange={setSelected}
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
            onChange={setValueTags}
            value={valueTags}
          />
        </ChatOptionsItem>
      </div>
    </aside>
  );
};

export default AsidePrompts;
