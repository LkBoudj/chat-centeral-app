import usePrompt from "@/lib/hocks/prompts/usePrompt";
import React from "react";
import Loading from "../global/Loading";
import ItemPrompt from "./ItemPrompt";
import { ScrollShadow, cn } from "@nextui-org/react";
import ContainerMaxWind from "../global/ContainerMaxWind";

type Props = {
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  prompts: any[];
};

const PromptsContent = ({
  className,
  isLoading,
  isSuccess,
  prompts,
}: Props) => {
  if (isLoading) return <Loading />;
  if (isSuccess)
    return (
      <ContainerMaxWind className="max-w-full px-6 py-6">
        <ScrollShadow
          className={cn(
            "w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-6",
            className
          )}
        >
          {prompts?.map((item: any) => {
            return (
              <ItemPrompt
                key={item.id}
                title={item.title}
                excerpt={item.excerpt}
                user={item?.user}
                license={item?.license}
                likedCount={item?.UsersLikerPrompts?.length ?? 0}
                commnetCount={item?.comments?.length ?? 0}
                createdAt={item.updatedAt}
                id={item.title}
              />
            );
          })}
        </ScrollShadow>
      </ContainerMaxWind>
    );
  return <></>;
};

export default PromptsContent;
