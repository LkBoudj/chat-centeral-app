"use client";
import Pricing2 from "@/components/sections/pricing-2";
import useSubscription from "@/lib/hocks/subscriptions/useSubscription";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { data } = useSubscription();
  return (
    <div>
      <div className="w-full flex items-center"></div>
      <Pricing2 data={data} />
    </div>
  );
};

export default page;
