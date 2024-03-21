"use client";
import { Modal, ModalContent, ModalFooter, Tab } from "@nextui-org/react";

import React, { useContext } from "react";
import Explorer from ".";
import { globalContext } from "@/components/context/GlobalContextProvider";
import UploadMedia from "./UploadMedia";
import { Media } from "@prisma/client";

const UploadExplorer = ({
  handelSelectFile,
  types,
}: {
  handelSelectFile?: (e: Media) => void;
  types?: string[];
}) => {
  const { onOpenChangeUploadFile: onOpenChangeUploadFile } =
    useContext(globalContext);

  return (
    <Modal size="full" isOpen={true} onOpenChange={onOpenChangeUploadFile}>
      <ModalContent>
        <div className="w-full h-full ">
          <Explorer
            types={types}
            handelSelectFile={handelSelectFile}
            endComponent={
              <Tab className="h-full w-full   " key="upload" title="New">
                <UploadMedia
                  closeWhenUploadDone={false}
                  handelSelectFile={handelSelectFile}
                />
              </Tab>
            }
          />
        </div>
      </ModalContent>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default UploadExplorer;
