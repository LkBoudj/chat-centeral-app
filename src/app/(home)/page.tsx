"use client";
import { ConfigContext } from "@/components/context/ConfigProvider";
import GuestNav from "@/components/navbar/guest";
import {
  Apps,
  Contact,
  Featurs,
  Footer,
  Main,
  Pricing,
  Success,
  Testimonials,
} from "@/components/sections";
import Pricing2 from "@/components/sections/pricing-2";
import useSubscription from "@/lib/hocks/subscriptions/useSubscription";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { data: plans } = useSubscription();
  const { dataOfNav: data }: any = useContext(ConfigContext);

  return (
    <div className="bg-blue-100/50">
      <GuestNav />
      <Main id={data[0].sectionId} />
      <div className=" bg-main space-y-16">
        <div>
          {/* <Testimonials id={data[1].sectionId} /> */}

          <Featurs id={data[1].sectionId} />
        </div>

        <Pricing2 data={plans} id={data[2].sectionId} />
        <Apps id={data[3].sectionId} />
        <Contact id={data[4].sectionId} />
        <Success id={data[5].sectionId} />
      </div>
      <Footer />
    </div>
  );
}
