import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const useSubscription = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSubscription, setCurrentSubscription] = useState<any>({});

  const { data: sessionData, status } = useSession();
  const user = sessionData?.user;

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/subscription");
      if (res.ok) {
        const { success, items } = await res.json();
        if (success) {
          setData(items);
        }
      } else {
        // Handle fetch error
      }
    } catch (error) {
      // Handle fetch error
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      getData();
    }
  }, [isLoading]);

  useEffect(() => {
    if (status === "authenticated" && user) {
      const myPlan =
        user.stripePriceId &&
        data?.find((item: any) => item.priceId === user.stripePriceId)?.name;
      setCurrentSubscription({
        name: myPlan || "Free",
        endDate: user.SubscriptionExpirydate,
        remaining: user.remaining > 0 ? user.remaining : 0,
      });
    }
  }, [status, data, user]);

  return {
    data,
    isLoading,
    currentSubscription,
    status,
  };
};

export default useSubscription;
