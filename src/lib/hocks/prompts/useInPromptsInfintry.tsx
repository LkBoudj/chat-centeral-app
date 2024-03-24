import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { Prompt } from "@prisma/client";

const useInPromptsInfantry = () => {
  // State variables
  const [valueTags, setValueTags] = useState<any[]>([]);
  const [selectedTech, setSelected] = useState<any>("0");
  const [search, setSearch] = useState<string>("");
  const [myPrompts, setMyPrompts] = useState<boolean>(false);
  const [items, setItems] = useState<Prompt[]>([]);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // Fetching prompts
  const { data, refetch, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    trpc.promptsAppRouter.showAll.useInfiniteQuery(
      {
        limit: 4,
        search,
        myPrompts,
        techId: selectedTech,
        tags: valueTags.join(","),
      },
      {
        getNextPageParam: (next: any) => {
          return next?.nextCursor;
        },
      }
    );

  // Handle next page
  const handleNextPage = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      if (hasNextPage) {
        fetchNextPage();
        setPage((page) => page + 1);
      }
      setIsLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    if (isSuccess && data.pages && Array.isArray(data.pages)) {
      if (search != "" || valueTags.length > 0 || selectedTech != "0") {
        setItems([...data.pages[page].items]);
      } else {
        setItems((items) => [...items, ...data.pages[page].items]);
      }
    }
  }, [isSuccess, setItems, data, search, valueTags, selectedTech, page]);

  return {
    data,
    setItems,
    items,
    isLoading,
    isSuccess,
    fetchNextPage,
    handleNextPage,
    refetch,
    hasNextPage,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    selectedTech,
    setSelected,
    valueTags,
    setValueTags,
    isLoadingMore,
  };
};

export default useInPromptsInfantry;
