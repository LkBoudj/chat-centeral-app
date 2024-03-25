import { cn, ScrollShadow } from "@nextui-org/react";
import { Prompt } from "@prisma/client";
import React from "react";
import ItemPrompt from "./ItemPrompt";

type Props = {
  prompts?: any[];
  handleDeletePrompt: (key: any) => void;
  handleEditPrompt: (key: any) => void;
};

const ListOfPrompts = (props: Props) => {
  const { prompts, handleDeletePrompt, handleEditPrompt } = props;
  return (
    <ScrollShadow
      className={cn(
        "  max-h-[var(--scrollAreaPrompt)] w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-7 pl-8  pr-6"
      )}
    >
      {prompts &&
        Array.isArray(prompts) &&
        prompts?.map((item) => {
          return (
            <ItemPrompt
              key={item.id}
              slug={item.slug}
              title={item.title}
              excerpt={item.excerpt}
              image={item?.image}
              tags={item.tags}
              onDelete={() => handleDeletePrompt(item.id)}
              onEdit={() => handleEditPrompt(item)}
              technology={item.technology?.name ?? null}
              user={item?.user}
              license={item?.license}
              likedCount={item?.UsersLikerPrompts?.length ?? 0}
              commentCount={item?.comments?.length ?? 0}
              createdAt={item.updatedAt}
              id={item.title}
            />
          );
        })}
    </ScrollShadow>
  );
};

export default ListOfPrompts;
