import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import usePaginationInfinteHock from "./usePaginationInfinteHock";

const useInfiniteMessages = ({
  id,
  limit = 10,
}: {
  id: string;
  limit?: number;
}) => {
  const { data, isLoading, isSuccess, error, isError, fetchNextPage } =
    trpc.messages.infiniteConversationMessages.useInfiniteQuery(
      {
        limit,
        id,
      },
      {
        getNextPageParam: (next) => next?.nextCursor ?? null,
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
  const toShow = data?.pages[page - 1]?.ietms ?? [];
  // useEffect(() => {
  //   setItems(data?.pages[page - 1].ietms);

  //   setIsHaveNext(data?.pages[page - 1].nextCursor ? true : false);
  // }, [data]);

  return {
    items: data,
    toShow,
    handelNextPage,
    handlePreviousPage,
    page,
    isSuccess,
    isHaveNext,
    isLoading,
    error,
    isError,
  };
};

export default useInfiniteMessages;
