"use client";
import { trpc } from "@/trpc/client";

import { useEffect } from "react";
import usePaginationInfinteHock from "./usePaginationInfinteHock";

const useInfiniteConversation = () => {
  const { data, isLoading, isSuccess, fetchNextPage } =
    trpc.conversations.infiniteChats.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (next) => next.nextCursor,
      }
    );

  const { items, setItems, page, setPage, setIsHaveNext, isHaveNext } =
    usePaginationInfinteHock();

  const handelNextPage = () => {
    fetchNextPage && fetchNextPage();
    setPage((page) => page + 1);
  };

  const handlePreviousPage = () => {
    if (page - 1 > 0) {
      let preP = page - 1;
      setPage(preP);
      setItems(data?.pages[preP - 1].ietms);
    }
  };

  useEffect(() => {
    setItems(data?.pages[page - 1].ietms);

    setIsHaveNext(data?.pages[page - 1].nextCursor ? true : false);
  }, [data, page, setIsHaveNext, setItems]);

  return {
    items,
    handelNextPage,
    handlePreviousPage,
    page,
    isSuccess,
    isHaveNext,
    isLoading,
  };
};

export default useInfiniteConversation;