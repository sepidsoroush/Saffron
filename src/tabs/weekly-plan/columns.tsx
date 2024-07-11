"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SelectMealComboBx } from "@/components/select-meal";

import { WeeklyPlan } from "@/types";

export const columns: ColumnDef<WeeklyPlan>[] = [
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "meal",
    header: "Meal",
  },
  {
    id: "actions",
    cell: () => {
      //   const day = row.original;

      return <SelectMealComboBx />;
    },
  },
];
