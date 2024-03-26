"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  Tab,
  Tabs,
  ScrollShadow,
  Button,
  cn,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useContext } from "react";
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
  action?: boolean;
};

interface FileManagerItemsProps extends FileManagerProps {
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  className?: string;
}

type TabListOfMediasProps = {
  type: string;
  action?: boolean;

  className?: string;
};

const TabListOfMedias: React.FC<TabListOfMediasProps> = (props) => {
  const { type, action, className } = props;

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
      <>
        <ScrollShadow
          offset={500}
          className={cn(
            "w-full  max-h-[var(--mediaScrollMaxHeight)] gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
            className
          )}
        >
          {medias.map((media: any, index: number) => {
            return (
              <div key={index}>
                {action ? (
                  <InnerDeleteMedia
                    onSelect={() => handelToggleSelectFiles(media)}
                    onDelete={() => handelDeleteMedia(media.id)}
                    className={`p-1 flex mx-auto md:mx-0  max-w-sm    border ${
                      isSelected(media) ? "bg-red-500" : "border-gray-50"
                    }  hover:border-gray-200 `}
                  >
                    <MediaItem
                      src={media.src}
                      type={type}
                      length={medias.length}
                    />
                  </InnerDeleteMedia>
                ) : (
                  <MediaItem
                    src={media.src}
                    type={type}
                    length={medias.length}
                  />
                )}
              </div>
            );
          })}
          <div className="max-w-md"></div>
        </ScrollShadow>

        {action && (
          <div className="flex gap-4 w-full  justify-end md:justify-end p-1 ">
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
          </div>
        )}
      </>
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

export const FileManagerItems: React.FC<FileManagerItemsProps> = (props) => {
  const {
    action,
    startComponent,
    endComponent,
    accept,
    expectedMediaTypes = ["image", "video", "audio", "pdf"],
    readonly,

    className,
  } = props;

  return (
    <Tabs aria-label="Options">
      {startComponent}
      {expectedMediaTypes.map((type, index) => (
        <Tab
          className="h-full "
          key={index.toString()}
          title={type.toUpperCase()}
        >
          <div className=" h-full overflow-hidden max-h-[var(--mediaTabMaxHeight)] space-y-4">
            <TabListOfMedias
              className={className}
              action={action}
              type={type}
            />
          </div>
        </Tab>
      ))}
      {endComponent}
      {!readonly && (
        <Tab className="h-full" key="upload" title="Upload">
          <FileUploadMedia accept={accept} />
        </Tab>
      )}
    </Tabs>
  );
};
const FileManager: React.FC<FileManagerProps> = (props) => {
  const {
    action,
    accept,
    expectedMediaTypes = ["image", "video", "audio", "pdf"],
    readonly,
  } = props;
  const { isUploadFileOpen, onOpenChangeUploadFile }: any =
    useContext(globalContext);
  return (
    <Modal
      isOpen={isUploadFileOpen}
      placement="bottom"
      onOpenChange={onOpenChangeUploadFile}
      size="full"
    >
      <ModalContent className="bg-slate-800/50  ">
        <ModalBody className="bg-white rounded ">
          <FileManagerItems
            accept={accept}
            expectedMediaTypes={expectedMediaTypes}
            readonly={readonly}
            action={true}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FileManager;
