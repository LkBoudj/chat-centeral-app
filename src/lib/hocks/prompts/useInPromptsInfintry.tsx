"use client";
import { trpc } from "@/trpc/client";

import { useEffect, useState } from "react";
import usePaginationInfinteHock from "../usePaginationInfinteHock";

const useInPromptsInfintry = () => {
  const [search, setSearch] = useState<string>("");
  const { items, setItems, page, setPage, isHaveNext, setIsHaveNext } =
    usePaginationInfinteHock();

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    trpc.promptsAppRouter.showAll.useInfiniteQuery(
      {
        limit: 4,
        search,
      },
      {
        getNextPageParam: (next: any) => next?.nextCursor,
      }
    );

  const hanldeNextPage = (page: number) => {
    hasNextPage && fetchNextPage();
    setPage(page);
  };
  useEffect(() => {
    if (isSuccess) {
      setItems(data.pages[page]);
    }
  }, [data, isSuccess, setItems, page]);
  return { items, isLoading, isSuccess, fetchNextPage, hanldeNextPage };
};

export default useInPromptsInfintry;
