"use client";
import React, { useContext, useState } from "react";
import Loading from "../global/Loading";
import ItemPrompt from "./ItemPrompt";
import { Button, ScrollShadow, cn } from "@nextui-org/react";
import ContainerMaxWind from "../global/ContainerMaxWind";
import Error from "../global/Error";
import { PromptHeader } from "..";
import { promptContext } from "../context/PromptContextProvider";
import ListOfPrompts from "./ListOfPrompts";

type Props = {
  className?: string;
};

const PromptsContent = ({ className }: Props) => {
  const [value, setValue] = useState("");

  const {
    handleEditPrompt,
    handleDeletePrompt,
    items,
    isLoading,
    isSuccess,
    handleNextPage,
    isLoadingMore,
    hasNextPage,
  } = useContext(promptContext);
  if (isLoading) return <Loading className={className} />;
  if (isSuccess)
    return (
      <ContainerMaxWind
        className={cn("max-w-full h-full pr-0  space-y-4 py-4 ", className)}
      >
        <PromptHeader value={value} setValue={setValue} />
        <ListOfPrompts
          prompts={items}
          handleDeletePrompt={handleDeletePrompt}
          handleEditPrompt={handleEditPrompt}
        />
        <div className="flex w-full justify-center  ">
          <Button
            isLoading={isLoadingMore}
            isDisabled={!hasNextPage}
            color="primary"
            className="max-w-md"
            onClick={handleNextPage}
          >
            Load more
          </Button>
        </div>
      </ContainerMaxWind>
    );
  return <Error />;
};

export default PromptsContent;
