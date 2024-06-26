"use client";

import { useDisclosure } from "@nextui-org/react";
import { Prompt } from "@prisma/client";

import React, { createContext } from "react";

import CreatePrompts from "../prompts/CreatePrompts";
import useTech from "@/lib/hocks/technology/useTech";
import EditPrompts from "../prompts/EditPrompts";
import usePrompt from "@/lib/hocks/prompts/usePrompt";
import useAside from "@/lib/hocks/prompts/useAside";

type promptContextResponce = {
  currentConversationId: number | null;
  setCurrentConversationId: (key?: any) => void;
};
export const promptContext = createContext<any>(null);

const PromptContextProvider: React.FC<{
  outValue?: any;
  children: React.ReactNode;
}> = ({ children, outValue }) => {
  const { techs } = useTech();
  const { isOpenAside, toggleAside } = useAside();
  const {
    handleDeletePrompt,
    refetch,
    items,
    isLoading,
    isSuccess,
    handleNextPage,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    setSelected,
    selectedTech,
    valueTags,
    setValueTags,
    isLoadingMore,
    setItems,
    hasNextPage,
    selectedPrompt,
    setSelectedPrompt,
    prompt,
    setPrompt,
    comments,
    setComments,
  } = usePrompt();

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onOpenChange: onOpenChangeCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const handleEditPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    onOpenEdit();
  };

  const value = {
    ...outValue,
    //--- session
    hasNextPage,
    isLoadingMore,
    prompt,
    setPrompt,
    //-- create & edit prompt methods
    onOpenCreate,
    handleDeletePrompt,
    handleEditPrompt,
    //--- technology
    techs,
    //---prompt
    refetch,
    items,
    isLoading,
    isSuccess,
    handleNextPage,
    setSearch,
    search,
    myPrompts,
    setMyPrompts,
    setSelected,
    selectedTech,
    valueTags,
    setValueTags,
    setItems,
    selectedPrompt,
    // media

    comments,
    setComments,
    isOpenAside,
    toggleAside,
  };
  return (
    <promptContext.Provider value={value}>
      {/* {isUploadFileOpen && (
        <UploadExplorer types={["image"]} handelSelectFile={handelSelectFile} />
      )} */}

      {isOpenCreate && (
        <CreatePrompts
          isOpen={isOpenCreate}
          techs={techs}
          onOpenChange={onOpenChangeCreate}
          onClose={onCloseCreate}
          setItems={setItems}
        />
      )}

      {isOpenEdit && (
        <EditPrompts
          isOpen={isOpenEdit}
          techs={techs}
          onOpenChange={onOpenChangeEdit}
          onClose={onCloseEdit}
          setItems={setItems}
        />
      )}

      {children}
    </promptContext.Provider>
  );
};

export default PromptContextProvider;
