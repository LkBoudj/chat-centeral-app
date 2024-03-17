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
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [plans, setPalns] = useState([]);
  const { dataOfNav: data }: any = useContext(ConfigContext);
  const getPricsData = async () => {
    const res = await fetch("/api/subscription");

    if (res.ok) {
      const json = await res.json();
      if (json.statsusCode == 201) {
        setPalns(json.data);
      }
    }
  };
  useEffect(() => {
    getPricsData();
  }, [plans]);
  return (
    <div className="bg-blue-100/50">
      <GuestNav />
      <Main id={data[0].sectionId} />
      <div className=" bg-main space-y-16">
        <div>
          {/* <Testimonials id={data[1].sectionId} /> */}

          <Featurs id={data[1].sectionId} />
        </div>
        <Pricing id={data[2].sectionId} plans={plans} />
        <Pricing2 />
        <Apps id={data[3].sectionId} />
        <Contact id={data[4].sectionId} />
        <Success id={data[5].sectionId} />
      </div>
      <Footer />
    </div>
  );
}
