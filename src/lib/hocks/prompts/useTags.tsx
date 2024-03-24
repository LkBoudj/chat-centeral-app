import React, { useEffect, useState } from "react";

type Props = {};

const useTags = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tags, seTags] = useState<any>([]);

  const getAllTags = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/tags`, {
      method: "GET",
    });

    if (res.ok) {
      const json = await res.json();

      const myTags = json.data.map((tag: any) => tag.name);
      seTags(myTags);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      getAllTags();
    }
  }, [isLoading, getAllTags]);
  return {
    tags,
    isLoading,
  };
};

export default useTags;
