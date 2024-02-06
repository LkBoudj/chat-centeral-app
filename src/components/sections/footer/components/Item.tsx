"use client";
import { Button, Link } from "@nextui-org/react";
const Item = ({
  Icon,
  label,
  href,
}: {
  Icon: any;
  label: string;
  href?: string;
}) => (
  <Link
    as={Link}
    href={href}
    color="primary"
    className="text-white flex items-center space-x-4"
  >
    <Icon className=" w-6 h-6 text-white" />
    <p>{label}</p>
  </Link>
);
export default Item;
