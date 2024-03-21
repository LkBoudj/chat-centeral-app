import { useState } from "react";

const usePaginationInfanteHock = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
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

export default usePaginationInfanteHock;
