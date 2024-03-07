"use client";

import moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Image,
  Button,
  Link,
} from "@nextui-org/react";
import { MessageCircleMore, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";

type Props = {
  image?: string;
  license?: string;
  title: string;
  excerpt: string;
  likedCount: number;
  commnetCount: number;
  tags?: string;
  user?: any;
  createdAt?: Date;
  ref?: any;
  onDelete?: (key: any) => void;
  onEdit?: (key: any) => void;
  id: string;
  technology?: string;
};

const MorrThan = ({ count, length }: { count: number; length: number }) => {
  const total = count - length;
  return (
    total > 0 && (
      <div className="border text-xs  flex items-center justify-center w-8 h-8 rounded-full ">
        <span>{total}+ </span>
      </div>
    )
  );
};
const ItemPrompt = ({
  id,
  onDelete,
  title,
  excerpt,
  license,
  image,
  tags,
  user,
  commnetCount,
  likedCount,
  createdAt,
  ref,
  onEdit,
  technology,
}: Props) => {
  const { data: session } = useSession();

  return (
    <div
      ref={ref}
      className="mx-auto w-full  ring-1 ring-slate-50 max-w-[330px] "
    >
      <Card className="w-full pt-4 space-y-6 shadow-xl  mx-auto border-none ">
        <CardHeader className="items-center justify-between py-0">
          <Link className="flex gap-5" href={`/profile/${user?.id}`}>
            <Avatar
              isBordered
              radius="full"
              className="w-12 h-12"
              src={user?.image ?? ""}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {user?.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400 space-x-2 ">
                <span>{technology ?? "all technologies"}</span>
                {/* <span>{license} </span> */}
              </h5>
            </div>
          </Link>
        </CardHeader>
        <Link
          className="text-black flex flex-col items-start space-y-3"
          href={`/prompts/${id}`}
        >
          <CardBody className="py-0 space-y-4  px-6  ">
            <Image
              shadow="none"
              radius="sm"
              width="100%"
              alt={title}
              className="w-full object-cover h-48"
              src={image && image != "" ? image : "/images/bg_c.webp"}
            />

            <h4 className="font-semibold text-md "> {title}</h4>
            <p className=" text-xs ">{excerpt}</p>
            <div className="flex items-center space-x-1 text-xs ">
              {tags
                ?.split(",")
                .slice(0, 2)
                .map((t) => (
                  <Button key={t} size="sm" color="default" variant="bordered">
                    {t}
                  </Button>
                ))}

              <MorrThan count={tags?.split(",").length ?? 0} length={2} />
            </div>
          </CardBody>
          <CardFooter className="px-6  flex items-center justify-between">
            <div className="space-x-4  flex items-center">
              <span className="px-0  flex items-center">
                <span className="mr-1">{likedCount}</span>{" "}
                <ThumbsUp size={13} />
              </span>
              <span className="px-0 flex items-center">
                <span className="mr-1">{commnetCount}</span>{" "}
                <MessageCircleMore size={13} />
              </span>
            </div>

            <span>{moment(createdAt).fromNow()}</span>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default ItemPrompt;
