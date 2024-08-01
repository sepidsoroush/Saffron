useNavigate;
import { useAppSelector } from "@/store/hooks";
import { selectMeals, selectFilteredMeals } from "@/store/meals/meals.selector";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Meal } from "@/types";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  setOpen: (open: boolean) => void;
  setSelectedMeal: (meal: Meal | null) => void;
};

export function MealList({ setOpen, setSelectedMeal }: Props) {
  const navigate = useNavigate();
  const mealsData = useAppSelector(selectMeals);
  const filteredMeals = useAppSelector(selectFilteredMeals);

  return (
    <Command>
      <CommandInput placeholder="Search meal..." />
      <CommandList>
        <CommandEmpty>
          {mealsData.length === 0 ? (
            <Button
              variant="link"
              className="flex flex-row justify-center items-center w-full whitespace-normal"
              onClick={() => navigate("/meals")}
            >
              No meals available. Start creating meals first
              <ArrowUpRight size={16} />
            </Button>
          ) : (
            "No results found."
          )}
        </CommandEmpty>
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
              className="text-base"
            >
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
