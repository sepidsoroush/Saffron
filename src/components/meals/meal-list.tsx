import { useMemo } from "react";

import { useAppSelector } from "@/store/hooks";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Meal, Schedule } from "@/types";

type Props = {
  setOpen: (open: boolean) => void;
  setSelectedMeal: (meal: Meal | null) => void;
};

export function MealList({ setOpen, setSelectedMeal }: Props) {
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
