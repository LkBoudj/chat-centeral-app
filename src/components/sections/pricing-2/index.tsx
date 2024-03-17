"use client";

import { cn } from "@nextui-org/react";
import PricingCard, { List } from "./components/PricingCard";

type Props = {
  data?: any[];
  component?: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

type PriceData = {
  type: string;
  price: string;
  subscription: string;
  description: string;
  buttonText: string;
  options: string[];
  active: boolean;
};

const Pricing = (props: Props) => {
  const { data, component, className, ...resetProps } = props;

  return (
    <section {...resetProps} className="relative z-10 overflow-hidden ">
      <div className={cn("container mx-auto space-y-4", className)}>
        <div className=" flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Pricing Table
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Our Pricing Plan
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        {component}
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 flex flex-wrap">
            {Array.isArray(data) &&
              data.map(
                (
                  {
                    type,
                    price,
                    subscription,
                    description,
                    buttonText,
                    options,
                    active,
                    id,
                    priceId,
                    messagesMax,
                  }: any,
                  index
                ) => (
                  <PricingCard
                    key={index}
                    type={type}
                    price={price}
                    subscription={subscription}
                    description={description}
                    buttonText={buttonText}
                    active={active}
                    id={id}
                    priceId={priceId}
                    messagesMax={parseInt(messagesMax) ?? 30}
                  >
                    {Array.isArray(options) &&
                      options?.map((option, index) => (
                        <List key={index}>{option.name} </List>
                      ))}
                  </PricingCard>
                )
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
