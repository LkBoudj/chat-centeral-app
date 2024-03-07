"use client";
import React, { createRef, useEffect, useRef, useState } from "react";
import Loading from "../global/Loading";
import ItemPrompt from "./ItemPrompt";
import { Button, Input, Pagination, ScrollShadow, cn } from "@nextui-org/react";
import ContainerMaxWind from "../global/ContainerMaxWind";
import { useIntersection } from "@mantine/hooks";
import { Search, SquarePen } from "lucide-react";

type Props = {
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isHaveNext?: boolean;
  search: string;
  prompts: any[];
  hanldeNextPage: () => void;
  setSearch: (key: any) => void;
  onOpen: () => void;
};

const PromptsContent = ({
  className,
  isLoading,
  isSuccess,
  prompts,
  hanldeNextPage,
  isHaveNext,
  setSearch,
  search,
  onOpen,
}: Props) => {
  const [value, setValue] = useState("");
  if (isLoading) return <Loading />;
  if (isSuccess)
    return (
      <ContainerMaxWind
        className={cn(
          "max-w-full h-full pr-0  space-y-4 pt-4 pb-16",
          className
        )}
      >
        <div className={cn("flex items-center justify-between  w-full px-8")}>
          <Input
            onValueChange={setValue}
            onKeyDown={(e) => {
              e.key == "Enter" && setSearch(value);
            }}
            onClear={() => {
              setValue("");
              setSearch("");
            }}
            value={value}
            startContent={<Search />}
            className="max-w-md"
            placeholder="search ..."
          />
          <Button onPress={onOpen} startContent={<SquarePen />} color="primary">
            wirte prompt
          </Button>
        </div>
        <ScrollShadow
          className={cn(
            "h-full w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 pb-12 px-6"
          )}
        >
          {Array.isArray(prompts) &&
            prompts?.map((item: any) => {
              return (
                <ItemPrompt
                  key={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
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

          <div className="grid sm:col-span-2 md:col-span-3 lg:col-span-4   pb-12 justify-center  ">
            <Button
              isLoading={isLoading}
              color="primary"
              className="max-w-md"
              onClick={hanldeNextPage}
            >
              Load more
            </Button>
          </div>
        </ScrollShadow>
      </ContainerMaxWind>
    );
  return <></>;
};

export default PromptsContent;
