import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  User,
} from "@nextui-org/react";

export default function App({
  name,
  comment,
  job,
  date,
  photo,
}: {
  comment: string;
  photo?: string;
  name: string;
  date: string;
  job: string;
}) {
  return (
    <div className="py-8 mr-4 xl:mr-0">
      <Card
        shadow="none"
        className="max-w-[430px] p-8 space-y-8 rounded-[24px] bg-slate-50"
      >
        <CardHeader className="flex gap-3 p-0">
          <User
            name="Jane Doe"
            description="Product Designer"
            avatarProps={{
              size: "md",
              src: photo ?? "/images/chat_image.jpg",
            }}
          />
        </CardHeader>

        <CardBody className="p-0">
          <p className="text-[#7E7E7E] text-[13px] leading-relaxed overflow-hidden">
            {comment}
          </p>
        </CardBody>

        <CardFooter className="p-0">
          <p className="text-[13px] font-bold ">{date}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
