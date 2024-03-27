import React from "react";
import EmailInput from "./EmailInput";

type Props = {
  title: string;
  description: string;
};

const MainLeft = ({ title, description }: Props) => {
  return (
    <div className="w-full">
      <div className="space-y-8 w-full px-4 :px-0 max-w-[641px]">
        <h1 className="text-[#001131] text-[27px]  md:text-[57px] font-bold leading-[44px] md:leading-[75px] capitalize">
          {title}
        </h1>
        <p className="text-[#999595] text-[14px] md:text-[20px] font-large leading-[25px] md:leading-[28px]">
          {description}
        </p>
        <EmailInput />
      </div>
    </div>
  );
};

export default MainLeft;
