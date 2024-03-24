"use client";
import { trpc } from "@/trpc/client";

import { useEffect } from "react";
import usePaginationInfanteHock from "../usePaginationInfanteHock";

const useInfiniteConversation = () => {
  const {
    data,
    isLoading: isLoadingC,
    isSuccess: isSuccessC,
    fetchNextPage,
    hasNextPage,
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
  } = usePaginationInfanteHock();

  const handelNextPageC = () => {
    if (hasNextPage) {
      fetchNextPage && fetchNextPage();
      setPage((page) => page + 1);
    }
  };

  const handlePreviousPageC = () => {
    if (pageC > 0) {
      setPage((page) => page - 1);
    }
  };

  useEffect(() => {
    if (isSuccessC && data?.pages) {
      setChats(data?.pages[pageC]?.items ?? []);
    }
  }, [data, pageC, setChats]);

  return {
    chats,
    setChats,
    handelNextPageC,
    handlePreviousPageC,
    pageC,
    isSuccessC,
    hasNextPage,
    isLoadingC,
  };
};

export default useInfiniteConversation;
