import { cn, Image, ScrollShadow } from "@nextui-org/react";
import { Media } from "@prisma/client";
import React from "react";

type Props = {};

export const MediaType = ({
  media,
  width,
  heigth,
  className,
}: {
  media: Media;
  width?: number;
  heigth?: number;
  className?: string;
}) => {
  const type = media?.type ? media?.type.trim().toLowerCase() : "";

  if (type.startsWith("image")) {
    return (
      <div className={className}>
        <Image
          alt={"ai image"}
          width={width}
          height={heigth}
          loading="lazy"
          className="w-[250px] rounded"
          src={media.src}
        />
      </div>
    );
  }
  if (type.startsWith("audio")) {
    return (
      <div className={className}>
        <audio controls>
          <source src={media.src} type="audio/mp3" />
          Your browser does not support the video tag.
        </audio>
      </div>
    );
  }

  if (type.startsWith("video")) {
    return (
      <div className={className}>
        <video width="320" height="240" controls>
          <source src="movie.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return null;
};
export const MediaContainer = ({
  media,
  fromMachin,
  className,
}: {
  media: any;
  fromMachin?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(`w-full flex `, className, !fromMachin && "justify-end")}
    >
      <div
        className={cn(
          " w-full my-4 max-w-lg grid gap-4 ",
          `  grid-cols-${media.length > 1 ? 2 : 1}`,
          !fromMachin && "justify-end"
        )}
      >
        {media.map((m: any, index: number) => (
          <MediaType key={index} media={m?.medias} />
        ))}
      </div>
    </div>
  );
};
export const MediaContainerGrid = ({
  media,
  fromMachin,
  className,
  handelSelectFile,
}: {
  media: Media[];
  fromMachin?: boolean;
  className?: string;
  handelSelectFile?: (key: Media) => void;
}) => {
  return (
    <ScrollShadow
      className={cn(
        " w-full my-4  grid gap-4 h-full max-h-[calc(100% - 150px)]",
        `grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-6`,
        !fromMachin && "justify-end"
      )}
    >
      {media.map((m, index) => (
        <div
          key={index}
          onClick={() => handelSelectFile && handelSelectFile(m)}
        >
          <MediaType media={m} />
        </div>
      ))}
    </ScrollShadow>
  );
};
const CustmMediaMediaComponent = {
  MediaContainer,
  MediaType,
  MediaContainerGrid,
};
export default CustmMediaMediaComponent;
