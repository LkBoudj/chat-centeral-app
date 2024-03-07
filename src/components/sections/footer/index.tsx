"use client";

import { useMemo } from "react";
import DescriptionCol from "./components/DescriptionCol";
import { Divider } from "@nextui-org/react";
import MenuFooterContact from "./components/Contact";
import MenuFooterService from "./components/MenuFooterService";
import { ContainerMaxWind } from "@/components";
import {
  BadgeCent,
  Component,
  MailCheck,
  Phone,
  TabletSmartphone,
  TimerReset,
  Building2,
} from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  const medias = useMemo(() => [], []);
  const dataContact = useMemo(
    () => [
      {
        title: "Our Mail address",
        label: "info@nuterralabs.com",
        Icon: MailCheck,
      },
      { title: "Our location", label: "Edmonton, Montreal", Icon: TimerReset },
      {
        title: "Ofition timing",
        label: "24hrs 7 days a week",
        Icon: Map,
      },
      {
        title: "Call Us for help!",
        label: "+1 (587) 715-0179",
        Icon: Phone,
      },
    ],
    []
  );

  const dataService = useMemo(
    () => [
      { label: "Website Design", Icon: Component, href: "" },
      { label: "Applications", Icon: TabletSmartphone, href: "" },
      { label: "Online Marketing", Icon: BadgeCent, href: "" },
      { label: "Business Solutions", Icon: Building2, href: "" },
    ],
    []
  );
  return (
    <footer className="bg-[#001131] text-white">
      <ContainerMaxWind className="py-16 px-5 lg:px-0 ">
        <div className="grid grid-cols-5 gap-8">
          <DescriptionCol
            medias={medias}
            description="Nu Terra Labs is a Canadian based business. We aim to bridge any gaps you may have and work to build partnerships. Our team brings experience in Websites, Graphic Design, Applications, Content Writing, Ecommerce / Drop shipping, SEO, Marketing and many other business related activities."
          />

          <div className="col-span-12 md:col-span-3 lg:col-span-1 space-y-5">
            <h6 className=" font-semibold capitalize">Services</h6>
            <MenuFooterService data={dataService} />
            {/* <MenuFooterContact data={dataService} /> */}
          </div>

          <div className="col-span-12 md:col-span-1  space-y-5">
            <h6 className=" font-semibold capitalize">Contact Us</h6>
            {/* <MenuFooterContact data={dataContact} /> */}
          </div>
        </div>
        <Divider className="bg-white my-16" />
        <div className="text-center  font-bold">
          <p>All property rights reserved to Nu Terra labs</p>
        </div>
      </ContainerMaxWind>
    </footer>
  );
};

export default Footer;
