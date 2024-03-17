"use client";
import Pricing2 from "@/components/sections/pricing-2";
import useSubscription from "@/lib/hocks/subscriptions/useSubscription";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import moment from "moment";

import React from "react";

type Props = {};

const TableManager = ({ currentSubscription }: any) => {
  console.log();

  return (
    <Table>
      <TableHeader>
        <TableColumn>Packages</TableColumn>
        <TableColumn>Expiry date</TableColumn>
        <TableColumn>Remaining messages</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {currentSubscription?.name ? (
          <TableRow>
            <TableCell>{currentSubscription.name}</TableCell>
            <TableCell>
              {moment(currentSubscription?.endDate).format()}
            </TableCell>
            <TableCell>{currentSubscription.name}</TableCell>
            <TableCell>
              {moment(currentSubscription?.endDate).format()}
            </TableCell>
          </TableRow>
        ) : (
          []
        )}
      </TableBody>
    </Table>
  );
};
const page = (props: Props) => {
  const { data, currentSubscription } = useSubscription();

  return (
    <div>
      <div className="w-full flex items-center"></div>
      <Pricing2
        data={data}
        component={<TableManager currentSubscription={currentSubscription} />}
      />
    </div>
  );
};

export default page;
