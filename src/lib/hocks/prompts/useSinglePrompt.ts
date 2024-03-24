import { promptContext } from "@/components/context/PromptContextProvider";

import { trpc } from "@/trpc/client";

import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { SinglePrompt } from "./usePrompt";

const useSinglePrompt = () => {
  const { slug } = useParams();
  const { prompt, setPrompt } = useContext(promptContext);

  const { data, isLoading, isSuccess, isPending, isError } =
    trpc.promptsAppRouter.single.useQuery({ slug: slug as string });

  useEffect(() => {
    if (isSuccess) {
      setPrompt(data as SinglePrompt);
    }
  }, [data, isSuccess, setPrompt]);
  return { prompt, isLoading, isError };
};

export default useSinglePrompt;
