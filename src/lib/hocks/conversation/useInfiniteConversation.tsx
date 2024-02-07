"use client";
import { trpc } from "@/trpc/client";

import { useEffect } from "react";
import usePaginationInfinteHock from "../usePaginationInfinteHock";

const useInfiniteConversation = () => {
  const {
    data,
    isLoading: isLoadingC,
    isSuccess: isSuccessC,
    fetchNextPage,
  } = trpc.conversations.infiniteChats.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam: (next) => next.nextCursor,
    }
  );

  const {
    items: chats,
    setItems: setChats,
    page: pageC,
    setPage,
    setIsHaveNext,
    isHaveNext: isHaveNextC,
  } = usePaginationInfinteHock();

  const handelNextPageC = () => {
    fetchNextPage && fetchNextPage();
    setPage((page) => page + 1);
  };

  const handlePreviousPageC = () => {
    if (pageC - 1 > 0) {
      let preP = pageC - 1;
      setPage(preP);
      setChats(data?.pages[preP - 1].ietms);
    }
  };

  useEffect(() => {
    setChats(data?.pages[pageC - 1]?.ietms);

    setIsHaveNext(data?.pages[pageC - 1]?.nextCursor ? true : false);
  }, [data, pageC, setIsHaveNext, setChats]);

  return {
    chats,
    setChats,
    handelNextPageC,
    handlePreviousPageC,
    pageC,
    isSuccessC,
    isHaveNextC,
    isLoadingC,
  };
};

export default useInfiniteConversation;
