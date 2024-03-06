import { trpc } from "@/trpc/client";

import { useEffect, useState } from "react";

const useTech = () => {
  const { data, isSuccess, isLoading } = trpc.technology.showAll.useQuery();
  const [techs, setTech] = useState<any>([]);

  useEffect(() => {
    setTech(data);
  }, [isSuccess, data]);
  return {
    data,
    isSuccess,
    isLoading,
    techs,
  };
};

export default useTech;
