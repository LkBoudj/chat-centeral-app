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
          Start Exploring for Free!
        </h1>
        <p className="max-w-[650px] mx-auto text-[20px] text-[#000000] leading-[28px]">
          With rapid change and innovation, ChatCentral brings it all together. With no upfront costs and no credit card required.
          Discover the power of having all your AI tools in one place.
          When you&apos;re ready to unlock even more features,
          our subscriptions are significantly more cost-effective than paying for each service separately. Begin your journey to smarter, more efficient work today.
          {" "}
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
          Login Now
        </Button>
      </div>
    </Section>
  );
};

export default Pricing;
