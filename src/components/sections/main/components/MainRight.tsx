import { Image } from "@nextui-org/react";
import React from "react";

type Props = {
  src: string;
};

const MainRight = ({ src }: Props) => {
  return (
    <div className="w-full max-w-xl hidden sm:block">
      <Image width={787} alt="Main Image" src={src} />
    </div>
  );
};

export default MainRight;
