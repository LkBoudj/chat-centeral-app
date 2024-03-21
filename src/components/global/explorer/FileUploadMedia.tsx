import { useUpload } from "@/lib/hocks/fileManager/useMedia";
import { Card, CardBody, Progress } from "@nextui-org/react";
import React from "react";

type FileUploadMediaProps = { accept?: any };

const FileUploadMedia = (props: FileUploadMediaProps) => {
  const { accept } = props;
  const { progress, getRootProps, getInputProps, isDragActive } = useUpload({
    accept,
  });
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

export default FileUploadMedia;
