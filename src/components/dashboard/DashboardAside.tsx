"use client";
import { Link, Listbox, ListboxItem } from "@nextui-org/react";

type Props = {
  dashNavigation: NavItem[];
};

const DashboardAside = ({ dashNavigation }: Props) => {
  return (
    <Listbox
      as={"aside"}
      aria-label="User Menu"
      className=" hidden lg:flex  h-full p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none  data-[hover=true]:bg-default-100/80",
      }}
    >
      {dashNavigation?.map((item) => (
        <ListboxItem
          as={Link}
          key={item.name}
          href={item.path}
          className="text-black font-bold"
          startContent={<item.Icon size={13} />}
        >
          {item.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
};

export default DashboardAside;
