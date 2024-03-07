"use client";
import { LkNavbar } from "@/components";
import AsidePrompts from "@/components/prompts/AsidePrompts";
import PromptsContent from "@/components/prompts/PromptsContent";
import { authNavigation } from "@/lib/data/authNavigation";
import useInPromptsInfintry from "@/lib/hocks/prompts/useInPromptsInfintry";

import useTech from "@/lib/hocks/technology/useTech";

type Props = {};

const PromptPage = (props: Props) => {
  const {
    isLoading: techIsLoading,
    isSuccess: techIsSuccess,
    techs,
  } = useTech();
  const {
    data,
    items,
    isLoading,
    isSuccess,
    hanldeNextPage,
    isHaveNext,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    setSelected,
    slectedTech,
    valueTage,
    setValueTage,
  } = useInPromptsInfintry();

  return (
    <div className="bg-[#EEEEEE] h-full ">
      <AsidePrompts
        valueTage={valueTage}
        setValueTage={setValueTage}
        myPrompts={myPrompts}
        setMyPrompts={setMyPrompts}
        handelSelectTech={setSelected}
        slectedTech={slectedTech}
        techs={techs}
        className="max-w-[332px] -translate-x-full lg:translate-x-0 "
      />

      <PromptsContent
        hanldeNextPage={hanldeNextPage}
        prompts={items}
        search={search}
        isLoading={isLoading}
        isHaveNext={isHaveNext}
        isSuccess={isSuccess}
        setSearch={setSearch}
        className="lg:pl-[340px] w-full "
      />
    </div>
  );
};

export default PromptPage;
