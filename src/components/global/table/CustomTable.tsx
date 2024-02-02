import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";

type Props = {
  items: any[];
  columns: any[];

  renderCell: any;
};

const CustomTable = ({ items, columns, renderCell }: Props) => {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns?.map((column) => (
          <TableColumn key={column?.key}>{column?.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
