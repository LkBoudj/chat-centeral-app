import { Section } from "@/components";
import React, { LegacyRef } from "react";
import Item from "./components/Item";
import RenderEditorJsData from "@/components/global/RenderEditorJsData";
import { Button, Link } from "@nextui-org/react";

type Props = {
  id?: LegacyRef<HTMLElement>;
  plans: any[];
};

const Pricing = ({ id, plans }: Props) => {
  return (
    <Section id={id} containerClass="py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="capitalize text-[48px] font-bold text-[#001131]">
          pricing
        </h1>
        <p className="max-w-[461px] mx-auto text-[14px] text-[#999595] leading-[28px]">
          Quisque convallis dolor a risus luctus, et tempor massa finibus. In
          egestas massa et lorem tempor,{" "}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {Array.isArray(plans) &&
          plans.map(
            ({
              title,
              price,
              scriptProductId,
              scriptPricetId,
              special,
              content,
              inHomePage,
              messagesMax,
            }) =>
              inHomePage ? (
                <Item
                  key={scriptPricetId}
                  title={title}
                  descriptiom={content}
                  special={special}
                  price={price}
                  priceId={scriptProductId}
                  productId={scriptPricetId}
                  messagesMax={messagesMax}
                />
              ) : (
                ""
              )
          )}
        {/* <Item
          title="Basic"
          descriptiom={
            "Rellable low-cost Shard hosting<br/>2GB Stroge <br/>500 Email Accounts<br/>10 Database<br/>500 GB bandwidth/Monthly"
          }
          price={0}
          priceId="price_1O2CMMLrFebWdS0T6O9ofw8Z"
        />
        <Item
          title="Basic"
          descriptiom={
            "Rellable low-cost Shard hosting<br/>2GB Stroge <br/>500 Email Accounts<br/>10 Database<br/>500 GB bandwidth/Monthly"
          }
          active={true}
          price={5.99}
          priceId="price_1O2CMMLrFebWdS0T6O9ofw8Z"
        />
        <Item
          title="Basic"
          descriptiom={
            "Rellable low-cost Shard hosting<br/>2GB Stroge <br/>500 Email Accounts<br/>10 Database<br/>500 GB bandwidth/Monthly"
          }
          price={5.99}
          priceId="price_1O2CMMLrFebWdS0T6O9ofw8Z"
        /> */}
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="light"
          color="default"
          size="lg"
          className="w-full max-w-sm text-[14] font-bold py-2 text-[#001131] "
          as={Link}
          href="/subscription"
        >
          See More
        </Button>
      </div>
    </Section>
  );
};

export default Pricing;
