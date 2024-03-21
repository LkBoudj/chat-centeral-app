import { globalContext } from "@/components/context/GlobalContextProvider";
import { Media } from "@prisma/client";
import axios from "axios";
import { access } from "fs";
import { ShieldAlert } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

type Props = {
  type: string;
  singleFile?: boolean;
};

type UseUploadType = {
  accept?: any;
};
export const useUpload = ({ accept }: UseUploadType) => {
  const [progress, setProgress] = useState(0);

  const upload_file = useCallback(
    async (formData: FormData) => {
      try {
        const res = await axios.post("/api/media", formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total }: any = progressEvent;
            let percentage = Math.floor((loaded * 100) / total);
            setProgress(percentage);
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { success, media, errors } = res.data;

        if (success) {
          toast.success("The uploaded successfully");
        } else {
          toast.error(errors);
        }
      } catch (error) {
        toast.error("Error uploading file:");
      }
    },
    [progress, setProgress]
  );
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setProgress(0);
      acceptedFiles.forEach((file: any) => {
        const formData = new FormData();

        formData.append("files", file);

        upload_file(formData);
      });
    },
    [setProgress, upload_file]
  );

  const handelUploadMedia = (e: React.ChangeEventHandler) => {
    console.log(e);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ?? {
      "image/*": [],
      "video/mp4": [],
      "audio/mp3": [],
      "application/pdf": [],
    },
  });
  return {
    handelUploadMedia,
    progress,
    getRootProps,
    getInputProps,
    isDragActive,
    onDrop,
  };
};

const useMedia = (props: Props) => {
  const { type, singleFile } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [medias, setMedias] = useState([]);
  const { files, setFiles, onClose }: any = useContext(globalContext);

  const getMediaByType = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(`/api/media?type=${type}`);

    const { success, data, error } = await res.json();
    if (success) {
      setMedias(data);
      setIsLoading(false);
    }
  }, [setIsLoading, type]);

  const handelDeleteMedia = useCallback(
    async (id: number) => {
      try {
        const res = await fetch("/api/media", {
          method: "DELETE",
          body: JSON.stringify({ id }),
        });

        const { success, data, errors } = await res.json();

        if (success) {
          const removeMedia = medias.filter((media: any) => media.id != data);
          setMedias(removeMedia);
        } else {
          toast.error(errors);
        }
      } catch (e) {
        toast.error("Sorry something warning !");
      }
    },
    [medias]
  );
  const handelToggleSelectFiles = useCallback(
    (media: Media) => {
      let selectedMedias = [media];

      if (!singleFile) {
        if (isSelected(media)) {
          selectedMedias = files.filter((m: Media) => m.id != media.id);
        } else {
          selectedMedias = [...files, ...selectedMedias];
        }
      }
      setFiles(selectedMedias);
    },
    [files, setFiles]
  );

  const isSaveDisable = () => !files.length;
  const isSelected = (media: Media) => {
    const file: any = files.find((m: Media) => m.id == media.id);

    return file ? true : null;
  };

  const handleSave = () => {
    onClose();
  };
  const handelCancelSelectButton = () => {
    setFiles([]);
    onClose();
  };
  useEffect(() => {
    if (isLoading) {
      getMediaByType();
    }
  }, [isLoading, getMediaByType]);

  return {
    medias,
    isLoading,
    handelDeleteMedia,
    handelToggleSelectFiles,
    isSelected,
    isSaveDisable,
    handelCancelSelectButton,
    handleSave,
  };
};

export default useMedia;
