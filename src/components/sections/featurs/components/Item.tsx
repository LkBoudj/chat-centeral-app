import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";

type Props = {
  title: string;
  description: string;
  src: string;
};

const Item = ({ title, description, src }: Props) => {
  return (
    <Card
      className=" cursor-pointer hover:scale-105 item-shadoe  pt-4 pb-8 "
      shadow="none"
    >
      <CardHeader className="space-y-4 flex-col  pb-0 justify-center ">
        <Image width={50} height={50} src={src} alt="" />
        <h4 className=" capitalize font-semibold text-[#001131] text-xl">
          {title}
        </h4>
      </CardHeader>
      <CardBody className="  text-[#000000] text-[18px] py-2 text-center ">
        <p className="max-w-[233px] mx-auto">{description}</p>
      </CardBody>
    </Card>
  );
};

export default Item;
