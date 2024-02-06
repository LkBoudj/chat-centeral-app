"use client";
import {
  Card,
  CardBody,
  Image,
  Modal,
  ModalContent,
  Progress,
  ScrollShadow,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { chatContext } from "../context/ChatContextProvider";
import { MediaContainer, MediaContainerGrid } from "./CustmMediaMediaComponent";
import { Media } from "@prisma/client";
type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onOpen?: () => void;
};

const UploadMedia = ({
  onDrop,
  progress,
}: {
  progress: number;
  onDrop: (key: any) => void;
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Card className="h-full">
      <CardBody className="h-full">
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            "ok"
          ) : (
            <p>Drag drop some files here, or click to select files</p>
          )}
          <Progress
            size="sm"
            radius="sm"
            classNames={{
              base: "max-w-sm",
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            label=" "
            value={progress}
            showValueLabel={true}
          />
        </div>
      </CardBody>
    </Card>
  );
};

const MediaFiles = ({
  type,
  handelSelectFile,
}: {
  type: string;
  handelSelectFile: (e: Media) => void;
}) => {
  const [medias, setMedia] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getDtat = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/media?type=${type}`);

    if (res.ok) {
      const json = await res.json();
      setMedia(json);
      setLoading(false);
    }
  }, [setLoading, type]);
  useEffect(() => {
    getDtat();
  }, [getDtat]);
  return (
    <div className="w-full h-full  flex items-center justify-center">
      {loading ? (
        <Spinner />
      ) : medias?.length ? (
        <MediaContainerGrid
          media={medias}
          handelSelectFile={handelSelectFile}
        />
      ) : (
        <Image src="/images/empty-folder.png" alt="empty " />
      )}
    </div>
  );
};
const UploadFile = ({ isOpen, onOpenChange, onOpen }: Props) => {
  const { progress, setProgress, setFile } = useContext(chatContext);

  const upload_file = useCallback(
    async (formData: FormData) => {
      setFile(null);
      setProgress(0.5);

      try {
        const res = await axios.post("/api/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total }: any = progressEvent;
            let precentage = Math.floor((loaded * 100) / total);
            setProgress(precentage);
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        onOpenChange && onOpenChange(false);
        const { success, media } = res.data;
        setFile(media);

        if (success) {
          setProgress(0);
          toast.success("The uploaded successfully");
        } else {
          toast.error("We've encountered a problem loading");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    [setFile, setProgress, onOpenChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setProgress(0);
      // acceptedFiles.forEach((files: any) => {
      const formData = new FormData();

      formData.append("files", acceptedFiles[0]);

      upload_file(formData);
      //  });
    },
    [setProgress, upload_file]
  );

  const handelSelectFile = (e: Media) => {
    setFile(e);
    onOpenChange && onOpenChange(false);
  };
  return (
    <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <div className="w-full h-full ">
          <Tabs className=" py-2" aria-label="Options">
            <Tab className="h-full  " key="photos" title="Photos">
              <MediaFiles type="image" handelSelectFile={handelSelectFile} />
            </Tab>
            <Tab key="audio" className="h-full  " title="Music">
              <MediaFiles type="audio" handelSelectFile={handelSelectFile} />
            </Tab>
            <Tab key="videos" className="h-full  " title="Videos">
              <MediaFiles type="video" handelSelectFile={handelSelectFile} />
            </Tab>
            <Tab className="h-full  " key="new" title="Add new">
              <UploadMedia onDrop={onDrop} progress={progress} />
            </Tab>
          </Tabs>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default UploadFile;
