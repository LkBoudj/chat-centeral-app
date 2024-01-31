import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

const useFrontTechnology = () => {
  const { data: technologies, isSuccess: loadTechsSuccess } =
    trpc.technology.showAll.useQuery();

  const [selectdTechnology, setSelectedTechnology] = useState<any>(null);
  const [selectdTechnologyId, setSelectedTechnologyId] = useState<any>(null);
  const [modelsSelectedTech, setModelSelectedTech] = useState<any[]>([]);
  const [selectdModel, setSelectedModel] = useState<any>("");
  const [selectdModelId, setSelectedModelId] = useState<any>(0);

  const handelSelecteTechnology = (key: any) => {
    setSelectedTechnologyId(key.target.value);
    const id = Number(key.target.value);
    //@ts-ignore
    const tech = technologies.find((tech) => tech.id == id);

    if (tech) {
      setSelectedTechnology(tech);
      const models = tech?.models?.split("#") ?? [];
      setModelSelectedTech(models);
      setSelectedModel(models[0] ?? null);
      setSelectedModelId(models[0] ? 0 : null);
    }
  };

  const hanldeSlectModel = (key: any) => {
    setSelectedModelId(key.target.value);
    const index = Number(key.target.value);
    setSelectedModel(modelsSelectedTech[index] ?? "");
  };
  useEffect(() => {
    if (technologies?.length) {
      const tech = technologies[0];
      setSelectedTechnology(tech);

      setSelectedTechnologyId(String(tech.id));
      if (technologies[0].models != "") {
        const models = technologies[0].models?.split("#") ?? [];
        setModelSelectedTech(models);
        setSelectedModel(models[0]);
        setSelectedModelId("0");
      }
    }
  }, [loadTechsSuccess, technologies]);

  return {
    hanldeSlectModel,
    selectdModelId,
    selectdTechnology,
    handelSelecteTechnology,
    selectdModel,
    selectdTechnologyId,
    modelsSelectedTech,
    loadTechsSuccess,
    technologies,
  };
};

export default useFrontTechnology;
