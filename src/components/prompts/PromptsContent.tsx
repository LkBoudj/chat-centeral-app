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
};

const PromptsContent = ({ className }: any) => {
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
    setSearch,
    onOpenCreate,
    toggleAside,
  } = useContext(promptContext);
  if (isLoading) return <Loading className={className} />;
  if (isSuccess)
    return (
      <ContainerMaxWind
        className={cn("max-w-full h-full pr-0  space-y-4 py-4 ", className)}
      >
        <PromptHeader value={value} setValue={setValue} />
        <ScrollShadow
          className={cn(
            "  max-h-[var(--scrollAreaPrmp)] w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-7 pl-8  pr-6"
          )}
        >
          {Array.isArray(items) &&
            items?.map((item: any) => {
              return (
                <ItemPrompt
                  key={item.id}
                  slug={item.slug}
                  title={item.title}
                  excerpt={item.excerpt}
                  image={item.image}
                  tags={item.tags}
                  onDelete={() => handleDeletePrompt(item.id)}
                  onEdit={() => handleEditPrompt(item)}
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
