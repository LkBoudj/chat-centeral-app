import { useState } from "react";

function usePaginationInfanteHock<T>() {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [isHaveNext, setIsHaveNext] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  return {
    items,
    setItems,
    page,
    setPage,
    isHaveNext,
    setIsHaveNext,
    isLoadingMore,
    setIsLoadingMore,
  };
}

export default usePaginationInfanteHock;
