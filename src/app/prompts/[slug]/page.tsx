import { ContainerMaxWind } from "@/components";
import { User } from "@nextui-org/react";
import React from "react";
import moment from "moment";
import ActionPromptShow from "@/components/prompts/ActionPromptShow";
type Props = {
  params: {
    slug: string;
  };
};

const PromptPage = ({ params }: Props) => {
  const { slug } = params;
  return (
    <ContainerMaxWind className="px-4 max-w-7xl ">
      <div className="space-y-6">
        <h1 className="text-[42px] font-bold">My toolkit for 2024</h1>
      </div>
    </ContainerMaxWind>
  );
};

export default PromptPage;
