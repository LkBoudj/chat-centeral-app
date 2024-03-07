import { Button, Input } from "@nextui-org/react";
import React from "react";
import EmailInput from "./EmailInput";

type Props = {
  title: string;
  description: string;
};

const MainLeft = ({ title, description }: Props) => {
  return (
    <div className="w-full">
      <div className="space-y-8 w-full max-w-[641px]">
        <h1 className="text-[#001131] text-[57px] font-bold leading-[75px] capitalize">
          {title}
        </h1>
        <p className="text-[#999595] text-[20px] font-large leading-[28px]">
          {description}
        </p>
        <EmailInput />
      </div>
    </div>
  );
};

export default MainLeft;
