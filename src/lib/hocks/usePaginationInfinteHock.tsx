import { useState } from "react";

const usePaginationInfinteHock = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [isHaveNext, setIsHaveNext] = useState(false);

  return {
    items,
    setItems,
    page,
    setPage,
    isHaveNext,
    setIsHaveNext,
  };
};

export default usePaginationInfinteHock;
