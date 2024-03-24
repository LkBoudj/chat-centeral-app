import { Divider } from "@nextui-org/react";
import React from "react";
import IconButton from "../global/IconButton";
import { ThumbsUp } from "lucide-react";

type Props = {};

const ActionPromptShow = ({
  liker,
  comment,
  handelLiker,
  handelComment,
  isLike,
}: {
  handelLiker?: () => void;
  handelComment?: () => void;
  liker: number;
  isLike?: boolean;
  comment: number;
}) => {
  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="space-x-5"></div>
        <div>
          <IconButton Icon={ThumbsUp} />
          <IconButton isDisabled={true} Icon={ThumbsUp} />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ActionPromptShow;
