"use client";

import { useEffect, useState } from "react";
import PricingCard, { List } from "./components/PricingCard";

type Props = {
  plans?: any[];
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

const pricingData = [
  {
    type: "Basic",
    price: "$29",
    subscription: "month",
    description: "Ideal for individuals and small businesses with basic needs.",
    buttonText: "Choose Basic",
    options: [
      "Limited access to DALL·E API",
      "50 requests per month",
      "Standard support",
    ],
    active: true,
  },
  {
    type: "Pro",
    price: "$99",
    subscription: "month",
    description:
      "Perfect for professionals and small teams requiring moderate usage.",
    buttonText: "Choose Pro",
    options: [
      "Moderate access to DALL·E API",
      "250 requests per month",
      "Priority support",
    ],
    active: false,
  },
  {
    type: "Enterprise",
    price: "$499",
    subscription: "month",
    description:
      "Tailored solutions for enterprises and organizations with high usage.",
    buttonText: "Contact Us",
    options: [
      "Full access to DALL·E API",
      "Unlimited requests",
      "Dedicated support",
    ],
    active: false,
  },
];

const Pricing = (props: Props) => {
  const { plans, ...resetProps } = props;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    const res = await fetch("/api/subscription");
    const { success, items } = await res.json();
    if (res.ok && success) {
      setData(items);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      getData();
    }
  }, [data, setData]);
  return (
    <section
      {...resetProps}
      className="relative z-10 overflow-hidden   pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
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
