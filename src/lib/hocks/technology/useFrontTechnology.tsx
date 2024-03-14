import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

const useFrontTechnology = () => {
  const { data: technologies, isSuccess: loadTechsSuccess } =
    trpc.technology.showAll.useQuery();
  const [selectTechnology, setSelectedTechnology] = useState<any>(null);
  const [modelsSelectedTech, setModelSelectedTech] = useState<any[]>([]);
  const [selectdModel, setSelectedModel] = useState<any>("");

  const handelSelecteTechnology = (key: any) => {
    setSelectedTechnology(key);

    const mySlectedModel =
      (key?.models?.trim() != "" ? key?.models?.trim().split("#") : []) ?? [];
    setModelSelectedTech(mySlectedModel ?? []);
    setSelectedModel(mySlectedModel[0] ?? "");
  };

  const hanldeSlectModel = (key: any) => {
    setSelectedModel(key);
  };
  useEffect(() => {
    if (technologies?.length) {
      setSelectedTechnology(technologies[0]);
      const modelsSelecetd =
        (technologies[0]?.models?.trim() != ""
          ? technologies[0]?.models?.trim().split("#")
          : []) ?? [];
      setModelSelectedTech(modelsSelecetd ?? []);
      setSelectedModel(modelsSelecetd[0] ?? "");
    }
  }, [loadTechsSuccess, technologies]);

  return {
    hanldeSlectModel,

    selectTechnology,
    handelSelecteTechnology,
    selectdModel,
    modelsSelectedTech,
    loadTechsSuccess,
    technologies,
  };
};

export default useFrontTechnology;
