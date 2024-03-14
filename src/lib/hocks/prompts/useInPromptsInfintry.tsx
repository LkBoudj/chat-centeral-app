"use client";
import { trpc } from "@/trpc/client";

import { useEffect, useState } from "react";
import usePaginationInfanteHock from "../usePaginationInfanteHock";

const useInPromptsInfantry = () => {
  const [valueTags, setValueTags] = useState<any[]>([]);
  const [selectedTech, setSelected] = useState<any>("0");
  const [search, setSearch] = useState<string>("");
  const [myPrompts, setMyPrompts] = useState<boolean>(false);
  const { items, setItems, page, setPage, isHaveNext, setIsHaveNext } =
    usePaginationInfanteHock();

  const { data, refetch, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    trpc.promptsAppRouter.showAll.useInfiniteQuery(
      {
        limit: 9,
        search,
        myPrompts,
        techId: selectedTech,
        tags: valueTags.join(","),
      },
      {
        getNextPageParam: (next: any) => {
          return next?.nextCursor + 9;
        },
      }
    );

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
      setPage((page) => page + 1);
    }
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     setItems([...items, ...(data?.pages[page]?.items ?? [])]);
  //     setItems(data?.pages[page]?.items ?? []);
  //     if (data?.pages?.length > 1) {
  //       setItems([...items, ...(data?.pages[page]?.items ?? [])]);
  //     } else {
  //       setItems(data?.pages[page]?.items ?? []);
  //     }
  //   }
  // }, [data, isSuccess, setItems, myPrompts, items, page]);
  useEffect(() => {
    if (isSuccess && data?.pages) {
      // Build the new items array based on fetched data
      const newItems = data.pages.reduce(
        (acc, pageData): any => [...acc, ...(pageData.items ?? [])],
        []
      );
      setItems(newItems);
    }
  }, [data, isSuccess, setItems]); // Dependencies are limited to what directly influences the effect
  return {
    data,
    setItems,
    items,
    isLoading,
    isSuccess,
    fetchNextPage,
    handleNextPage: handleNextPage,
    refetch,
    isHaveNext,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    selectedTech,
    setSelected,
    valueTags: valueTags,
    setValueTags,
  };
};

export default useInPromptsInfantry;
