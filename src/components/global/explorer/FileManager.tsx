"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  Tab,
  Tabs,
  cn,
  ScrollShadow,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import "video.js/dist/video-js.css";
import useMedia from "@/lib/hocks/fileManager/useMedia";
import FileUploadMedia from "./FileUploadMedia";
import Loading from "../Loading";
import { globalContext } from "@/components/context/GlobalContextProvider";
import MediaItem, { InnerDeleteMedia } from "./MediaItem";

type FileManagerProps = {
  accept?: any;
  expectedMediaTypes?: string[];
  readonly?: boolean;
};

type TabListOfMediasProps = {
  type: string;
};

const TabListOfMedias: React.FC<TabListOfMediasProps> = (props) => {
  const { type } = props;

  const {
    medias,
    isLoading,
    handelDeleteMedia,
    handelToggleSelectFiles,
    isSelected,
    isSaveDisable,
    handelCancelSelectButton,
    handleSave,
  } = useMedia({ type, singleFile: true });
  if (isLoading) {
    return <Loading />;
  } else if (medias.length) {
    return (
      <Card className="h-full">
        <CardBody>
          <ScrollShadow className="w-full  max-h-[--mediaScrollMaxHeight] gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {medias.map((media: any, index: number) => {
              return (
                <InnerDeleteMedia
                  key={index}
                  onSelect={() => handelToggleSelectFiles(media)}
                  onDelete={() => handelDeleteMedia(media.id)}
                  className={`p-1 flex mx-auto md:mx-0  w-full   border ${
                    isSelected(media) ? "bg-red-500" : "border-gray-50"
                  }  hover:border-gray-200 `}
                >
                  <MediaItem
                    src={media.src}
                    type={type}
                    length={medias.length}
                  />
                </InnerDeleteMedia>
              );
            })}
            <div className="max-w-md"></div>
          </ScrollShadow>
        </CardBody>
        <CardFooter className="gap-4 w-full justify-end">
          <Button
            onPress={handelCancelSelectButton}
            variant="bordered"
            className={` rounded-sm`}
            size="sm"
          >
            Close
          </Button>
          <Button
            isDisabled={isSaveDisable()}
            onPress={handleSave}
            variant="bordered"
            className={` rounded-sm`}
            size="sm"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <Image
        src="/images/empty-folder.png"
        width={50}
        height={50}
        alt="empty"
      />
    </div>
  );
};
const FileManager: React.FC<FileManagerProps> = (props) => {
  const {
    accept,
    expectedMediaTypes = ["image", "video", "audio", "pdf"],
    readonly,
  } = props;
  const {
    isUploadFileOpen,
    onOpenUploadFile,
    onOpenChangeUploadFile,
    onClose,
  }: any = useContext(globalContext);
  return (
    <Modal
      isOpen={isUploadFileOpen}
      onOpenChange={onOpenChangeUploadFile}
      className="p-24"
      size="full"
    >
      <ModalContent className="bg-slate-800/50  ">
        <ModalBody className="bg-white rounded ">
          <Tabs aria-label="Options">
            {expectedMediaTypes.map((type, index) => (
              <Tab
                className="h-full"
                key={index.toString()}
                title={type.toUpperCase()}
              >
                <TabListOfMedias type={type} />
              </Tab>
            ))}
            {!readonly && (
              <Tab className="h-full" key="upload" title="Upload">
                <FileUploadMedia accept={accept} />
              </Tab>
            )}
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FileManager;
