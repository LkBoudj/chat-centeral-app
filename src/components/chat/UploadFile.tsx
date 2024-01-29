"use client";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  Progress,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onOpen?: () => void;
};

const UploadFile = ({ isOpen, onOpenChange, onOpen }: Props) => {
  const [progress, setProgress] = useState(0);
  const upload_file = async (formData: FormData) => {
    setProgress(0.5);
    axios
      .post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total }: any = progressEvent;
          let precentage = Math.floor((loaded * 100) / total);
          setProgress(precentage);
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        onOpen && onOpen();
        setProgress(0);
        const { success } = res.data;
        if (success) toast.success("Tthe uploaded successfully");
        else toast.error("We've encountered a problem loading");
      });
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setProgress(0);
    acceptedFiles.forEach((files: any) => {
      const formData = new FormData();

      formData.append("files", files);

      upload_file(formData);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={progress > 0 ? () => {} : onOpenChange}
    >
      <ModalContent>
        <Card className="h-64">
          <CardBody className="h-full  ">
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                "ok"
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
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
      </ModalContent>
    </Modal>
  );
};

export default UploadFile;
