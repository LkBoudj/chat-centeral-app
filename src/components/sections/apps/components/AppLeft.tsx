import { Button, Image } from "@nextui-org/react";
import React from "react";

type Props = {
  title: string;
  description: string;
};

const AppLeft = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left  w-full space-y-8">
      <h4 className="max-w-[548px] capitalize text-lg sm:text-[43px] font-bold text-[#001131] leading-snug">
        {title}
      </h4>
      <p className="max-w-[461px]  text-[14px] text-[#999595] leading-[28px]">
        {description}
      </p>
      <div className="flex gap-4  flex-col md:flex-row">
        <Button
          color="primary"
          size="sm"
          className="capitalize  py-7 px-8 text-[16px] font-bold bg-[#001131]"
          startContent={
            <Image className="w-8 h-8" src="/images/google-play.png" alt="" />
          }
        >
          Google play
        </Button>
        <Button
          size="sm"
          color="primary"
          className="capitalize  py-7 px-8 text-[17px] font-bold bg-[#001131]"
          startContent={
            <Image className="w-8 h-8" src="/images/app-store.png" alt="" />
          }
        >
          App Store
        </Button>
      </div>
    </div>
  );
};

export default AppLeft;
