"use client";
import { cn, Image } from "@nextui-org/react";
import IconButton from "../IconButton";
import { Check, Pause, Play, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoProps extends React.ComponentPropsWithRef<"video"> {}
interface AudioProps extends React.ComponentPropsWithRef<"audio"> {}
import WaveSurfer from "wavesurfer.js";

export const Audio = (props: AudioProps) => {
  const { src } = props;
  const waveformRef: any = useRef(null);
  const myCurrentWaveSurferRef: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // if (waveformRef.current) {

    if (src) {
      myCurrentWaveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#9b95f3",
        progressColor: "#6c83f5",
        height: 30,
      });
      if (myCurrentWaveSurferRef.current) {
        myCurrentWaveSurferRef.current.load(src as string);

        myCurrentWaveSurferRef.current.on("finish", () => {
          // Reset play state when the audio finishes playing
          setIsPlaying(false);
        });
      }
    }
    // }

    return () => {
      myCurrentWaveSurferRef.current.destroy();
    };
  }, [src, waveformRef, myCurrentWaveSurferRef, setIsPlaying]);

  const handelPlayPause = useCallback(() => {
    if (myCurrentWaveSurferRef.current) {
      myCurrentWaveSurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);
  return (
    <div className="flex items-center gap-1 w-full min-w-64">
      <IconButton
        onClick={handelPlayPause}
        size={18}
        Icon={isPlaying ? Pause : Play}
      />
      <div id="waveform" className="w-full" ref={waveformRef}></div>
    </div>
  );
};
export const Video: React.FC<VideoProps> = (props) => {
  const { className, src, ...resetProps } = props;
  const playerRef: React.RefObject<HTMLVideoElement> =
    useRef<HTMLVideoElement>(null);

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
    return <Audio src={src} />;
  } else if (type.startsWith("video")) {
    return <Video className="w-full" src={src} autoPlay={false} />;
  } else if (type.startsWith("image")) {
    return (
      <Image
        // width={140}
        // height={140}
        src={src}
        alt="media"
        className={cn("w-full h-full rounded-md ", styleMedia)}
      />
    );
  }

  return <div>other</div>;
};

export default MediaItem;
