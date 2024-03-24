import { trpc } from "@/trpc/client";

import useInPromptsInfantry from "./useInPromptsInfintry";
import { useState } from "react";
import { Prompt } from "@prisma/client";
export type SinglePrompt = any;
const usePrompt = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [prompt, setPrompt] = useState<SinglePrompt>(null);
  const [comments, setComments] = useState<Comment[] | null>([]);
  const {
    refetch,
    items,
    isLoading,
    isSuccess,
    handleNextPage,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    setSelected,
    selectedTech,
    valueTags,
    setValueTags,
    isLoadingMore,
    setItems,
    hasNextPage,
  } = useInPromptsInfantry();

  const { mutate, status: statusOfDelete } =
    trpc.promptsAppRouter.delete.useMutation({
      async onSuccess(opt) {
        if (opt.success && opt.id) {
          const filter = items.filter((p) => p.id != opt.id);
          setItems(filter);
        }
      },
    });

  const handleDeletePrompt = (id: number) => {
    mutate({ id });
  };

  return {
    handleDeletePrompt,
    refetch,
    items,
    isLoading,
    isSuccess,
    handleNextPage,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    setSelected,
    selectedTech,
    valueTags,
    setValueTags,
    isLoadingMore,
    setItems,
    hasNextPage,
    selectedPrompt,
    setSelectedPrompt,
    prompt,
    setPrompt,
    comments,
    setComments,
  };
};

export default usePrompt;
