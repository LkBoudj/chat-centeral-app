"use client";
import { Spinner, Image } from "@nextui-org/react";
import { Media } from "@prisma/client";
import { useState, useCallback, useEffect } from "react";
import { MediaContainerGrid } from "../../chat/CustmMediaMediaComponent";

const MediaFiles = ({
  type,
  handelSelectFile,
}: {
  type: string;
  handelSelectFile?: (e: Media) => void;
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

  // const handelDeleteFile = async (id: number) => {
  //    const res = await fetch(`/api/media?type=${type}`);
  // };
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

export default MediaFiles;
