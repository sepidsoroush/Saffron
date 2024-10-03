import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchBulkIngredients } from "@/store/ingredients/ingredients.actions";
import { fetchBulkMeals } from "@/store/meals/meals.actions";
import { selectBulkIngredients } from "@/store/ingredients/ingredients.selector";
import { selectMeals, selectBulkMeals } from "@/store/meals/meals.selector";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CloudDownload } from "lucide-react";

import AnimatedCheckIcon from "./animated-check-icon";
import BulkMeals from "./bulk-meals";

export default function OnboardingTrigger() {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const bulkIngredients = useAppSelector(selectBulkIngredients);
  const bulkMeals = useAppSelector(selectBulkMeals);
  const currentMealsData = useAppSelector(selectMeals);

  const remainingMeals = bulkMeals.filter(
    (item) => !currentMealsData.find((rm) => rm.name === item.name)
  );

  useEffect(() => {
    if (bulkMeals.length === 0) {
      dispatch(fetchBulkMeals());
    }
    if (bulkIngredients.length === 0) {
      dispatch(fetchBulkIngredients());
    }
  }, [bulkMeals, bulkIngredients, dispatch]);

  const closeDrawerHandler = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Card className="flex flex-row justify-between items-center px-4 py-2 m-2 min-h-14">
          <Label>Recipe suggestions</Label>

          <CloudDownload size={20} className="m-2" />
        </Card>
        {/* <Button variant="link" className="px-0 mx-0">
          Recipe suggestions
        </Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>
          <VisuallyHidden.Root>Recipe suggestions</VisuallyHidden.Root>
        </DrawerTitle>
        <DrawerDescription>
          <VisuallyHidden.Root>Recipe suggestions</VisuallyHidden.Root>
        </DrawerDescription>
        {remainingMeals.length === 0 ? (
          <div className="h-[calc(100vh-180px)] flex flex-col justify-center items-center">
            <AnimatedCheckIcon isVisible={true} initial={true} />
            <p className="tetx-lg font-semibold">
              We are out of suggestions :(
            </p>
            <p className="w-3/5 text-sm text-gray-500 text-center mt-2">
              Try adding your favorite foods by + button in the meals tab
            </p>

            <Button
              variant="default"
              className="mt-8"
              onClick={closeDrawerHandler}
            >
              Done
            </Button>
          </div>
        ) : (
          <BulkMeals
            remainingMeals={remainingMeals}
            bulkIngredients={bulkIngredients}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
