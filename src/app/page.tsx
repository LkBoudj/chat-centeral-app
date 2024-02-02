"use client";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="w-full h-screen bg-sky-600 flex items-center justify-center">
      <audio controls>
        <source
          src={"/media/audio/speech_1706902624956.mp3"}
          type="audio/mp3"
        />
        Your browser does not support the video tag.
      </audio>
    </div>
  );
}
