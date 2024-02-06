import { Button, Image } from "@nextui-org/react";
import React from "react";

type Props = {
  title: string;
  description: string;
};

const AppLeft = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left  w-full space-y-8">
      <h4 className="max-w-[548px] capitalize text-[43px] font-bold text-[#001131]">
        {title}
      </h4>
      <p className="max-w-[461px]  text-[14px] text-[#999595] leading-[28px]">
        {description}
      </p>
      <div className="flex space-x-8">
        <Button
          color="primary"
          className="capitalize  py-8 px-8 text-[16px] font-bold bg-[#001131]"
          startContent={<Image src="/images/google-play.png" />}
        >
          Google play
        </Button>
        <Button
          color="primary"
          className="capitalize  py-8 px-8 text-[17px] font-bold bg-[#001131]"
          startContent={<Image src="/images/app-store.png" />}
        >
          App Store
        </Button>
      </div>
    </div>
  );
};

export default AppLeft;
