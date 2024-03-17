"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const useSubscription = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSubscription, setCurrentSubscription] = useState({
    name: "Free",
    endDate: new Date(),
  });
  const { data: session, status } = useSession();
  const user = session?.user;

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

  useEffect(() => {
    if (status == "authenticated") {
      let myPlan: any = "free";
      if (user.stripePriceId && data?.length) {
        myPlan =
          (Array.isArray(data) &&
            data?.find((item: any) => {
              return item.priceId == user.stripePriceId;
            })?.name) ??
          "free";
      }
      setCurrentSubscription({
        ...currentSubscription,
        endDate: user.SubscriptionExpirydate,
        name: myPlan,
      });
    }
  }, [status]);
  return {
    data,
    getData,
    isLoading,
    setData,
    currentSubscription,
  };
};

export default useSubscription;
