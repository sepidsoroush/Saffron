import { useAppSelector } from "@/store/hooks";
import {
  selectAllMeals,
  selectFilteredMeals,
} from "@/store/meals/meals.selector";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Meal } from "@/types";

type Props = {
  setOpen: (open: boolean) => void;
  setSelectedMeal: (meal: Meal | null) => void;
};

export function MealList({ setOpen, setSelectedMeal }: Props) {
  const mealsData = useAppSelector(selectAllMeals);
  const filteredMeals = useAppSelector(selectFilteredMeals);

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
                  mealsData.find((item) => item.name === value) || null
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
