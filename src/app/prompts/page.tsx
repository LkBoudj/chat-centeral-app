"use client";
import { LkNavbar } from "@/components";
import AsidePrompts from "@/components/prompts/AsidePrompts";
import PromptsContent from "@/components/prompts/PromptsContent";
import { authNavigation } from "@/lib/data/authNavigation";
import useInPromptsInfintry from "@/lib/hocks/prompts/useInPromptsInfintry";
import usePrompt from "@/lib/hocks/prompts/usePrompt";
import useTech from "@/lib/hocks/technology/useTech";

type Props = {};

const PromptPage = (props: Props) => {
  const { items, isLoading, isSuccess, hanldeNextPage } =
    useInPromptsInfintry();

  const {
    isLoading: techIsLoading,
    isSuccess: techIsSuccess,
    techs,
    setSelected,
    slectedTech,
  } = useTech();

  return (
    <div className="h-screen overflow-hidden">
      <LkNavbar navsData={authNavigation} className={"z-50"} />
      <div className="bg-[#EEEEEE] h-full ">
        <AsidePrompts
          handelSelectTech={setSelected}
          slectedTech={slectedTech}
          techs={techs}
          className="max-w-[332px] -translate-x-full lg:translate-x-0 "
        />

        <PromptsContent
          hanldeNextPage={hanldeNextPage}
          prompts={items}
          isLoading={isLoading}
          isSuccess={isSuccess}
          className="lg:pl-[340px] w-full "
        />
      </div>
    </div>
  );
};

export default PromptPage;
