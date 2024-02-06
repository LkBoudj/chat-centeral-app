import React from "react";

type Props = {
  text: string;
  Icon: any;
};

function Media({ text, Icon }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5" />
      <span className="text-[18px]">{text}</span>
    </div>
  );
}

export default Media;
