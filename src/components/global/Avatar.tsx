import { Image } from "lucide-react";

interface CustomButtonUploadFilesProps {
  fileSrc: string | undefined;
  onOpenUploadFile: () => void;
}

const CustomButtonUploadFiles: React.FC<CustomButtonUploadFilesProps> = ({
  fileSrc,
  onOpenUploadFile,
}) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <div
        className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
        onClick={onOpenUploadFile}
      >
        {fileSrc ? (
          <img
            src={fileSrc}
            className="w-full h-full rounded-full object-cover"
            alt="Uploaded Avatar"
          />
        ) : (
          <Image className="text-gray-500 text-3xl" />
        )}
      </div>
    </div>
  );
};

export default CustomButtonUploadFiles;
