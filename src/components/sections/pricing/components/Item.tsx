import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import { OutputData } from "@editorjs/editorjs";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";

import { useRouter } from "next/navigation";
import RenderEditorJsData from "@/components/global/RenderEditorJsData";
import { twMerge } from "tailwind-merge";
type Props = {
  title: string;
  descriptiom: OutputData;
  price: number;
  special?: Boolean;
  priceId: string;
  productId: string;
  messagesMax: number;
};

const Item = ({
  title,
  descriptiom,
  price,
  special = false,
  priceId,
  productId,
  messagesMax,
}: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handelSubscription = async () => {
    const res = await fetch("/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        productId,
        messagesMax,
      }),
    });
    const json = await res.json();
    if (res.ok && json.statsusCode == 201) router.push(json.data);
  };
  return (
    <Card
      className={clsx(
        "hover:scale-105 rounded-[9px] w-full max-w-[285px] mx-auto py-16 price-item",
        special && "bg-[#001131] text-white"
      )}
      shadow="none"
    >
      <CardHeader className="flex-col space-y-2">
        <h4 className=" font-bold text-lg">{title}</h4>
        <h5 className="space-x-1">
          <span className="font-bold text-[19px]">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "usd",
            })}
          </span>
          <span>/month</span>
        </h5>
      </CardHeader>
      <CardBody className={twMerge(clsx())}>
        <RenderEditorJsData
          className={`text-center text-[12px]  font-bold px-2 ${
            special && "text-white"
          } `}
          data={descriptiom}
        />
      </CardBody>
      <CardFooter className="">
        {status == "authenticated" && session && session.user ? (
          <Button
            className={clsx(
              "mx-auto w-[116px] text-[10px] font-bold border-1 ",
              special ? "proseborder-white text-white" : "border-[#001131]"
            )}
            variant="bordered"
            onClick={handelSubscription}
          >
            By Now
          </Button>
        ) : (
          <Button
            as={Link}
            href={"/login"}
            className={clsx(
              "mx-auto w-[116px] text-[10px] font-bold border-1 ",
              special ? "border-white text-white" : "border-[#001131]"
            )}
            variant="bordered"
          >
            By Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Item;
