"use client";

import { ColumnDef } from "@tanstack/react-table";

export type WeeklyPlan = {
  id: number;
  day: string;
  meal: string;
};

export const columns: ColumnDef<WeeklyPlan>[] = [
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "meal",
    header: "Meal",
  },
];
