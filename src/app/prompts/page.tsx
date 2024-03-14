"use client";

import { promptContext } from "@/components/context/PromptContextProvider";
import AsidePrompts from "@/components/prompts/AsidePrompts";

import PromptsContent from "@/components/prompts/PromptsContent";
import { useContext } from "react";

type Props = {};

const PromptPage = (props: Props) => {
  const {
    hanldeEditPrompt,
    items,
    isLoading,
    isSuccess,
    handleNextPage,
    isHaveNext,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    setSelected,
    selectedTechTech,
    valueTags,
    setValueTags,
    techs,
    onOpenCreate,
  } = useContext(promptContext);

  return (
    <>
      <div className="bg-[#EEEEEE] h-screen">
        <AsidePrompts
          valueTags={valueTags}
          setValueTags={setValueTags}
          myPrompts={myPrompts}
          setMyPrompts={setMyPrompts}
          handelSelectTech={setSelected}
          selectedTechTech={selectedTechTech}
          techs={techs}
          className="max-w-[332px] -translate-x-full lg:translate-x-0 "
        />

        <PromptsContent
          onOpen={onOpenCreate}
          handleNextPage={handleNextPage}
          prompts={items}
          search={search}
          isLoading={isLoading}
          isHaveNext={isHaveNext}
          isSuccess={isSuccess}
          setSearch={setSearch}
          className="lg:pl-[350px] w-full "
        />
      </div>
    </>
  );
};

export default PromptPage;
