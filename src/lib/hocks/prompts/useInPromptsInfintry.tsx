"use client";
import { trpc } from "@/trpc/client";

import { useEffect, useState } from "react";
import usePaginationInfinteHock from "../usePaginationInfinteHock";

const useInPromptsInfintry = () => {
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
  useEffect(() => {
    if (isSuccess && data?.pages?.length > 1) {
      setItems([...items, ...(data?.pages[page].items ?? [])]);
    } else {
      setItems(data?.pages[page].items ?? []);
    }
  }, [data, isSuccess, setItems, myPrompts, items, page]);

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
  };
};

export default useInPromptsInfintry;
