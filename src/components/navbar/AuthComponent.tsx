import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

type Props = {};

const AuthComponent = (props: Props) => {
  const { data: session } = useSession();
  return (
    <div>
      <Dropdown className="">
        <DropdownTrigger>
          <Avatar
            className=" cursor-pointer"
            src={(session && session.user?.image) ?? "/images/default.jpeg"}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="profile" href="/profile">
            Profile
          </DropdownItem>

          <DropdownItem
            onClick={() => signOut()}
            key="logout"
            className="text-danger"
            color="danger"
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AuthComponent;
