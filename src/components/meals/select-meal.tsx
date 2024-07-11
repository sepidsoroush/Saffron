"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { WeeklyPlan } from "@/types";

const meals: WeeklyPlan[] = [
  {
    id: 1,
    day: "Monday",
    meal: "Pasta Alfredo",
  },
  {
    id: 2,
    day: "Tuesday",
    meal: "Salmon and salad",
  },
  {
    id: 3,
    day: "Wednesday",
    meal: "Hamburger and fries",
  },
  {
    id: 4,
    day: "Thursday",
    meal: "Beef stroganoff",
  },
  {
    id: 5,
    day: "Friday",
    meal: "Fajita",
  },
  {
    id: 6,
    day: "Saturday",
    meal: "Pizza margarita",
  },
  {
    id: 7,
    day: "Sunday",
    meal: "Steak",
  },
];

export function SelectMealComboBx() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedMeal, setSelectedMeal] = React.useState<WeeklyPlan | null>(
    null
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {selectedMeal ? <>{selectedMeal.meal}</> : <Plus />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <MealList setOpen={setOpen} setSelectedMeal={setSelectedMeal} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="justify-start">
          {selectedMeal ? <>{selectedMeal.meal}</> : <Plus />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <MealList setOpen={setOpen} setSelectedMeal={setSelectedMeal} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function MealList({
  setOpen,
  setSelectedMeal,
}: {
  setOpen: (open: boolean) => void;
  setSelectedMeal: (meal: WeeklyPlan | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search meal..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {meals.map((item) => (
            <CommandItem
              key={item.id}
              value={item.meal}
              onSelect={(value) => {
                setSelectedMeal(
                  meals.find((item) => item.meal === value) || null
                );
                setOpen(false);
              }}
            >
              {item.meal}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
