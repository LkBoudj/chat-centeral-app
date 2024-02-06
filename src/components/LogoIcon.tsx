import { Bot } from "lucide-react";
import React from "react";

type Props = {
  className?: string;
};

const LogoIcon = ({ className }: Props) => {
  return (
    <>
      <Bot size={30} className="text-blue-800" />
      <p className="font-bold text-inherit">CENTERAL</p>
    </>
  );
};

export default LogoIcon;
