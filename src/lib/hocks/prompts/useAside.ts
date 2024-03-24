import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
type Props = {};

const useAside = () => {
  const [isOpenAside, setIsOpenAside] = useState<boolean>(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1446px)",
  });
  const toggleAside = () => {
    setIsOpenAside(!isOpenAside);
  };

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setIsOpenAside(false);
    } else {
      setIsOpenAside(true);
    }
  }, [isDesktopOrLaptop]);
  return {
    isOpenAside,
    setIsOpenAside,
    toggleAside,
  };
};

export default useAside;
