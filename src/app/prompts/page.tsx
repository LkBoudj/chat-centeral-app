"use client";
import { LkNavbar } from "@/components";
import AsidePrompts from "@/components/prompts/AsidePrompts";
import PromptsContent from "@/components/prompts/PromptsContent";
import { authNavigation } from "@/lib/data/authNavigation";
import { useEffect, useState } from "react";

type Props = {};

const PromptPage = (props: Props) => {
  const [slectedTech, setSelected] = useState<any>();
  useEffect(() => {
    console.log(slectedTech);
  }, [slectedTech]);
  return (
    <div className="bg-[#EEEEEE] h-screen">
      <LkNavbar navsData={authNavigation} className={"z-50"} />
      <AsidePrompts handelSelectTech={setSelected} slectedTech={slectedTech} />
      <div className="flex h-full">
        <PromptsContent />
      </div>
    </div>
  );
};

export default PromptPage;
