"use client";
import React, { useContext, useState } from "react";
import Loading from "../global/Loading";
import ItemPrompt from "./ItemPrompt";
import { Button, ScrollShadow, cn } from "@nextui-org/react";
import ContainerMaxWind from "../global/ContainerMaxWind";
import Error from "../global/Error";
import { PromptHeader } from "..";
import { promptContext } from "../context/PromptContextProvider";

type Props = {
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isHaveNext?: boolean;
  search: string;
  prompts: any[];
  handleNextPage: () => void;
  setSearch: (key: any) => void;
  onOpen: () => void;
};

const PromptsContent = ({
  className,
  isLoading,
  isSuccess,
  prompts,
  handleNextPage,
  isHaveNext,
  setSearch,
  search,
  onOpen,
}: Props) => {
  const [value, setValue] = useState("");
  const { hanldeDeletePrompt, hanldeEditPrompt } = useContext(promptContext);

  if (isLoading) return <Loading />;
  if (isSuccess)
    return (
      <ContainerMaxWind
        className={cn("max-w-full h-full pr-0  space-y-4 py-4 ", className)}
      >
        <PromptHeader
          setValue={setValue}
          setSearch={setValue}
          value={value}
          onOpen={onOpen}
        />
        <ScrollShadow
          className={cn(
            "  max-h-[var(--scrollAreaPrmp)] w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 pl-8  pr-6"
          )}
        >
          {Array.isArray(prompts) &&
            prompts?.map((item: any) => {
              return (
                <ItemPrompt
                  key={item.id}
                  slug={item.slug}
                  title={item.title}
                  excerpt={item.excerpt}
                  image={item.image}
                  tags={item.tags}
                  onDelete={() => hanldeDeletePrompt(item.id)}
                  onEdit={() => hanldeEditPrompt(item)}
                  technology={item.technology?.name ?? null}
                  user={item?.user}
                  license={item?.license}
                  likedCount={item?.UsersLikerPrompts?.length ?? 0}
                  commnetCount={item?.comments?.length ?? 0}
                  createdAt={item.updatedAt}
                  id={item.title}
                />
              );
            })}
        </ScrollShadow>
        <div className="flex w-full justify-center  ">
          <Button
            isLoading={isLoading}
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
