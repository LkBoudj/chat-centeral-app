import { globalContext } from "@/components/context/GolobalContextProvider";
import { Card, CardBody, Progress } from "@nextui-org/react";
import { Media } from "@prisma/client";
import axios from "axios";
import { useCallback, useContext } from "react";

import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const UploadMedia = ({
  closeWhenUploadDone = true,
  handelSelectFile,
}: {
  closeWhenUploadDone?: boolean;
  handelSelectFile?: (e: Media) => void;
}) => {
  const { setProgress, onClose, onOpenChangeUloadFile, setFile, progress } =
    useContext(globalContext);

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

        const { success, media } = res.data;

        if (success) {
          {
            closeWhenUploadDone && onClose();
          }
          {
            handelSelectFile && handelSelectFile(media);
          }
          setFile(media);
          setProgress(0);
          toast.success("The uploaded successfully");
        } else {
          toast.error("We've encountered a problem loading");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    [setFile, setProgress, handelSelectFile, closeWhenUploadDone, onClose]
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

export default UploadMedia;
