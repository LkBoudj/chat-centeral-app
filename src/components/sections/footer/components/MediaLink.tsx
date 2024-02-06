"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {
  link?: string;
  Icon: any;
};

const MediaLink = ({ link, Icon }: Props) => {
  return (
    <Button
      color="primary"
      className="text-white"
      as={Link}
      href={link}
      isIconOnly
      variant="light"
      aria-label="Like"
    >
      <Icon />
    </Button>
  );
};

export default MediaLink;
