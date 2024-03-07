"use client";
import { trpc } from "@/trpc/client";

import { useEffect, useState } from "react";
import usePaginationInfinteHock from "../usePaginationInfinteHock";

const useInPromptsInfintry = () => {
  const [valueTage, setValueTage] = useState<any>([]);
  const [slectedTech, setSelected] = useState<any>("0");
  const [search, setSearch] = useState<string>("");
  const [myPrompts, setMyPrompts] = useState<boolean>(false);
  const { items, setItems, page, setPage, isHaveNext, setIsHaveNext } =
    usePaginationInfinteHock();

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    trpc.promptsAppRouter.showAll.useInfiniteQuery(
      {
        limit: 9,
        search,
        myPrompts,
        techId: slectedTech,
        tags: valueTage,
      },
      {
        getNextPageParam: (next: any) => {
          return next?.nextCursor + 9;
        },
      }
    );

  const hanldeNextPage = () => {
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
  }, [data, isSuccess]); // Dependencies are limited to what directly influences the effect
  return {
    data,
    items,
    isLoading,
    isSuccess,
    fetchNextPage,
    hanldeNextPage,
    isHaveNext,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    slectedTech,
    setSelected,
    valueTage,
    setValueTage,
  };
};

export default useInPromptsInfintry;
