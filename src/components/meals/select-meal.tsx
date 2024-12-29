import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
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
import { AddFill } from "@/components/shared/icons";
import { MealList } from "./meal-list";

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
          <div className="w-full h-16 flex items-center place-content-center">
            <div className="text-neutral-300 bg-neutral-100 rounded-full w-[30px] h-[30px] flex items-center place-content-center shadow-inner">
              <AddFill width={20} height={20} />
            </div>
          </div>
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
        <div className="w-full h-16 flex items-center place-content-center">
          <div className="text-neutral-300 bg-neutral-100 rounded-full w-[30px] h-[30px] flex items-center place-content-center shadow-inner">
            <AddFill width={20} height={20} />
          </div>
        </div>
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
