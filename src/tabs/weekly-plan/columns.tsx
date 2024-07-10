"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
import { AddMealComboBx } from "@/components/add-meal";

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

      return <AddMealComboBx />;
    },
  },
];
