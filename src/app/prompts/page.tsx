"use client";
import { LkNavbar } from "@/components";
import AsidePrompts from "@/components/prompts/AsidePrompts";
import PromptsContent from "@/components/prompts/PromptsContent";
import { authNavigation } from "@/lib/data/authNavigation";
import usePrompt from "@/lib/hocks/prompts/usePrompt";
import useTech from "@/lib/hocks/technology/useTech";

type Props = {};

const PromptPage = (props: Props) => {
  const { prompts, isLoading, isSuccess } = usePrompt();
  const {
    isLoading: techIsLoading,
    isSuccess: techIsSuccess,
    techs,
    setSelected,
    slectedTech,
  } = useTech();

  return (
    <>
      <LkNavbar navsData={authNavigation} className={"z-50"} />
      <div className="bg-[#EEEEEE] h-full ">
        <AsidePrompts
          handelSelectTech={setSelected}
          slectedTech={slectedTech}
          techs={techs}
          className="max-w-[340px] -translate-x-full lg:translate-x-0 "
        />

        <PromptsContent
          prompts={prompts}
          isLoading={isLoading}
          isSuccess={isSuccess}
          className="lg:pl-[340px] w-full "
        />
      </div>
    </>
  );
};

export default PromptPage;
