import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

const usePrompt = () => {
  const [prompts, setPromps] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const { data, isSuccess, isLoading } = trpc.promptsAppRouter.showAll.useQuery(
    {
      search,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setPromps(data);
      console.log(data);
    }
  }, [data, setPromps, isSuccess]);
  return { prompts, isSuccess, isLoading, setSearch, search };
};

export default usePrompt;
