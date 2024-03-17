"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const useSubscription = () => {
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
  return {
    data,
    getData,
    isLoading,
    setData,
  };
};

export default useSubscription;
