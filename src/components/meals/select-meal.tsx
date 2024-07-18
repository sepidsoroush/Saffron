import { useState, useEffect, useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { useMediaQuery } from "@/hooks/use-media-query";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";

import { Meal, Schedule } from "@/types";
import { WeekDay } from "@/types/constants";

type Props = {
  day: WeekDay;
  onMealChange: (day: WeekDay, mealId: number) => void;
};

export function SelectMealComboBox({ day, onMealChange }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    if (selectedMeal) {
      onMealChange(day, selectedMeal.id);
    }
  }, [selectedMeal, day, onMealChange]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} aria-describedby={undefined}>
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
        <DrawerTitle>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerTitle>
        <DrawerDescription>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerDescription>
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
  const schedule = useAppSelector<Schedule[]>(
    (state) => state.schedule.schedule
  );

  const mealIdsInSchedule = useMemo(
    () => schedule.map((item) => Number(item.meal_id)).filter(Boolean),
    [schedule]
  );

  const filteredMeals = useMemo(
    () => meals.filter((item) => !mealIdsInSchedule.includes(item.id)),
    [meals, mealIdsInSchedule]
  );

  return (
    <Command>
      <CommandInput placeholder="Search meal..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filteredMeals.map((item) => (
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
