"use client";
import { cn } from "@nextui-org/react";
import IconButton from "../IconButton";
import { Check, Trash } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
interface VideoProps extends React.ComponentPropsWithRef<"video"> {}

export const Video: React.FC<VideoProps> = (props) => {
  const { className, src, ...resetProps } = props;
  const playerRef: React.RefObject<HTMLVideoElement> =
    useRef<HTMLVideoElement>(null);
  // useEffect(() => {
  //   if (playerRef.current) {
  //     player = videoJs(playerRef.current, {
  //       controls: true,
  //       autoplay: false, // Adjust as needed
  //     });
  //     player.src(src);
  //   }

  //   // return () => {
  //   //   if (player) {
  //   //     player.dispose();
  //   //   }
  //   // };
  // }, [src, playerRef]);
  return (
    <>
      <video
        ref={playerRef}
        className={cn("  video-js ", className)}
        src={src}
        {...resetProps}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the audio element.
      </video>
    </>
  );
};

export const InnerDeleteMedia: React.FC<any> = (props) => {
  const { children, className, onSelect, onDelete } = props;
  return (
    <div className={cn("w-full group overflow-hidden relative", className)}>
      <div className="z-[999999] media_inner_actions">
        <IconButton
          onClick={onSelect}
          className="text-green-400"
          Icon={Check}
        />
        <IconButton
          onClick={onDelete}
          size={20}
          className="text-red-400"
          Icon={Trash}
        />
      </div>
      {children}
    </div>
  );
};

import React from "react";

type Props = {};

const MediaItem: React.FC<any> = (props) => {
  const { src, type } = props;
  const styleMedia = "w-full";

  if (type.startsWith("audio")) {
    return (
      <audio
        className={cn(" rounded-md max-w-[240px]", styleMedia)}
        controls
        src={src}
        autoPlay={false}
      >
        <source src={src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    );
  } else if (type.startsWith("video")) {
    return <Video className="w-full" src={src} autoPlay={false} />;
  } else if (type.startsWith("image")) {
    return (
      <Image
        width={140}
        height={140}
        src={src}
        alt="media"
        objectFit="cover"
        className={cn("w-full h-full rounded-md ", styleMedia)}
      />
    );
  }

  return <div>other</div>;
};

export default MediaItem;
