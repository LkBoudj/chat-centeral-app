import { Image } from "@nextui-org/react";
import React from "react";

type Props = {
  src: string;
};

const AppRight = ({ src }: Props) => {
  return (
    <div className="w-full flex justify-center lg:justify-start pt-10">
      <Image src={src} width={512} />
    </div>
  );
};

export default AppRight;
