import { useState } from "react";
import { useAppSelector } from "@/store/hooks";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

// import BulkIngredients from "./bulk-ingredients";
import AnimatedCheckIcon from "./animated-check-icon";
import jsonIngredients from "@/__mock/ingredients.json";
import jsonMeals from "@/__mock/meals.json";
import { Ingredient, Meal } from "@/types";
import BulkMeals from "./bulk-meals";
import { selectMeals } from "@/store/meals/meals.selector";

export default function OnboardingTrigger() {
  const [open, setOpen] = useState(false);

  const bulkMeals: Meal[] = jsonMeals;
  const bulkIngredients: Ingredient[] = jsonIngredients;
  const currentMealsData = useAppSelector(selectMeals);

  const remainingMeals = bulkMeals.filter(
    (item) => !currentMealsData.find((rm) => rm.name === item.name)
  );

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button variant="link" className="px-0 mx-0">
          Import Data
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerTitle>
        <DrawerDescription>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerDescription>
        {remainingMeals.length !== 0 ? (
          <BulkMeals meals={remainingMeals} bulkIngredients={bulkIngredients} />
        ) : (
          <div className="h-[calc(100vh-180px)] flex flex-col justify-center items-center">
            <AnimatedCheckIcon
              isVisible={remainingMeals.length === 0}
              initial={true}
            />
            <p className="tetx-lg font-semibold">
              All initial ingredients added
            </p>
            <p className="w-3/5 text-sm text-gray-500 text-center mt-2">
              Try adding your personal ingredients by + button in the
              ingredients page
            </p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
