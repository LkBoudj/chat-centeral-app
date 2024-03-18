"use client";
import { IconButton } from "@/components";
import Pricing2 from "@/components/sections/pricing-2";
import useSubscription from "@/lib/hocks/subscriptions/useSubscription";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import moment from "moment";

import React, { useCallback, useMemo } from "react";

type Props = {};

const Page: React.FC<Props> = (props) => {
  // Renamed component to start with an uppercase letter
  const { data, currentSubscription, status } = useSubscription(); // Corrected function name to start with lowercase
  const tableManager = useMemo(() => {
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
                {moment(currentSubscription.endDate).format()}
              </TableCell>
              <TableCell>{currentSubscription.remaining}</TableCell>
              <TableCell>
                <Button color="danger" size="sm">
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            []
          )}
        </TableBody>
      </Table>
    );
  }, [currentSubscription]);
  return (
    <div>
      <div className="w-full flex items-center"></div>
      <Pricing2 data={data} component={tableManager} />
    </div>
  );
};

export default Page;
