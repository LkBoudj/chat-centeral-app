"use client";
import { useRouter } from "next/navigation";
import IconPricing from "../../pricing/IconPricing";

const PricingCard = ({
  id,
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
  priceId,
  messagesMax,
}: any) => {
  const route = useRouter();
  const getSubscription = async () => {
    const res = await fetch("/api/subscription", {
      method: "post",
      body: JSON.stringify({
        priceId,
        messagesMax: parseInt(messagesMax) ?? 30,
      }),
    });
    const { url, success } = await res.json();

    if (success) {
      route.push(url);
    }
  };
  return (
    <>
      <div className="w-full px-4  max-w-[350px]">
        <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
          <span className="mb-3 block text-lg font-semibold text-primary">
            {type}
          </span>
          <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
            {price}
            <span className="text-base font-medium text-body-color dark:text-dark-6">
              / {subscription}
            </span>
          </h2>
          <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
            {description}
          </p>
          <div className="mb-9 flex flex-col gap-[14px]">{children}</div>
          <button
            onClick={() => getSubscription()}
            className={` ${
              active
                ? "block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
                : "block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3"
            } `}
          >
            {buttonText}
          </button>
          <div>
            <span className="absolute right-0 top-7 z-[-1]">
              <svg
                width={77}
                height={172}
                viewBox="0 0 77 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1={86}
                    y1={0}
                    x2={86}
                    y2={172}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-4 top-4 z-[-1]">
              <IconPricing />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export const List = ({ children }: any) => {
  return (
    <p className="text-base text-body-color dark:text-dark-6">{children}</p>
  );
};

export default PricingCard;
