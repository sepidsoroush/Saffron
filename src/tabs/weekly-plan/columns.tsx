"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { SelectMealComboBx } from "@/components/meals/select-meal";

import { Schedule } from "@/types";

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "meal",
    header: "Meal",
  },
  // {
  //   id: "actions",
  //   cell: () => {
  //     //   const day = row.original;

  //     return <SelectMealComboBx />;
  //   },
  // },
];
