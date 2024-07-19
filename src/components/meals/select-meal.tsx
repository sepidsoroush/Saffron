import { useState, useEffect } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";

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
import { MealList } from "./meal-list";
import { Plus } from "lucide-react";

import { Meal } from "@/types";
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
