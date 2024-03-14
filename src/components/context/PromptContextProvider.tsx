"use client";

import { limit_infinite_messagess } from "@/lib/configs/infinte_scrolle_config";
import { useConversationHock } from "@/lib/hocks";
import useMessageHoock from "@/lib/hocks/message/useMessageHoock";
import useFrontTechnology from "@/lib/hocks/technology/useFrontTechnology";
import { useDisclosure } from "@nextui-org/react";
import { Media, Prompt } from "@prisma/client";
import { useSession } from "next-auth/react";

import React, { createContext, useContext, useEffect, useState } from "react";
import UploadExplorer from "../global/explorer/UploadExplorer";
import { globalContext } from "./GolobalContextProvider";
import { trpc } from "@/trpc/client";
import useInPromptsInfantry from "@/lib/hocks/prompts/useInPromptsInfintry";
import CreatePrompts from "../prompts/CreatePrompts";
import useTech from "@/lib/hocks/technology/useTech";
import EditPrompts from "../prompts/EditPrompts";

type promptContextResponce = {
  currentConversationId: number | null;
  setCurrentConversationId: (key?: any) => void;
};
export const promptContext = createContext<any>(null);

const PronptContextProvider: React.FC<{
  outValue?: any;
  children: React.ReactNode;
}> = ({ children, outValue }) => {
  const [selectedPrompt, setSlectedPromp] = useState<Prompt | null>(null);
  const {
    isLoading: techIsLoading,
    isSuccess: techIsSuccess,
    techs,
  } = useTech();

  const {
    refetch,
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
    selectedTech,
    valueTags,
    setValueTags,
    setItems,
  } = useInPromptsInfantry();

  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUloadFile,
    onClose,
  } = useDisclosure();
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

  const {
    mutate: deleteApi,

    status: statusOfDelete,
  } = trpc.promptsAppRouter.delete.useMutation({
    async onSuccess(opt) {
      if (opt.success && opt.id) {
        const filter = items.filter((p) => p.id != opt.id);
        setItems(filter);
      }
    },
  });
  const { data: session, status } = useSession();
  const sessionUser = session?.user;

  const { file, setFile } = useContext(globalContext);

  const [progress, setProgress] = useState(0);

  const handelSelectFile = (e: Media) => {
    setFile(e);
    onClose();
  };

  const hanldeDeletePrompt = (id: number) => {
    deleteApi({ id });
  };

  const hanldeEditPrompt = (prompt: Prompt) => {
    setSlectedPromp(prompt);
    onOpenEdit();
  };

  const value = {
    ...outValue,
    //--- session
    sessionUser,

    //-- create & edit prompt methods
    onOpenCreate,
    hanldeDeletePrompt,
    hanldeEditPrompt,
    //--- technology
    techs,
    //---prompt
    refetch,
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
    selectedTech,
    valueTags,
    setValueTags,
    setItems,
    selectedPrompt,
    // media
    file,
    setFile,
    progress,
    setProgress,
    onOpenUploadFile,
    onOpenChangeUloadFile,
  };
  return (
    <promptContext.Provider value={value}>
      {isUploadFileOpen && (
        <UploadExplorer types={["image"]} handelSelectFile={handelSelectFile} />
      )}

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

export default PronptContextProvider;
