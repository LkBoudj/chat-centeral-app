"use client";
import { promptContext } from "@/components/context/PromptContextProvider";
import AsidePrompts from "@/components/prompts/AsidePrompts";
import PromptsContent from "@/components/prompts/PromptsContent";
import { useContext } from "react";

const PromptPage = () => {
  const { isOpenAside } = useContext(promptContext);
  return (
    <div className="bg-[#EEEEEE] h-screen">
      <AsidePrompts className={`max-w-[332px]`} />
      <PromptsContent
        className={`${!isOpenAside && "lg:pl-[350px]"} w-full `}
      />
    </div>
  );
};

export default PromptPage;
