"use client";

import { useState, useEffect } from "react";

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
import { useAppSelector } from "@/store/hooks";
import { Meal } from "@/types";
import { WeekDay } from "@/types/constants";
import { useAppDispatch } from "@/store/hooks";
import { addSchedule } from "@/store/schedule-actions";

type Props = {
  day: WeekDay;
};

export function SelectMealComboBox({ day }: Props) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    if (selectedMeal) {
      dispatch(addSchedule(day, selectedMeal.id));
    }
  }, [selectedMeal, dispatch, day]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            <Plus />
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
          <Plus />
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
  setSelectedMeal: (meal: Meal | null) => void;
}) {
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);

  return (
    <Command>
      <CommandInput placeholder="Search meal..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {meals.map((item) => (
            <CommandItem
              key={item.id}
              value={item.name}
              onSelect={(value) => {
                setSelectedMeal(
                  meals.find((item) => item.name === value) || null
                );
                setOpen(false);
              }}
            >
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
