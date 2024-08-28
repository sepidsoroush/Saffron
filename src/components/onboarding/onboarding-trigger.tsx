import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectBulkIngredients } from "@/store/ingredients/ingredients.selector";
import { selectIngredients } from "@/store/ingredients/ingredients.selector";
import { fetchBulkIngredients } from "@/store/ingredients/ingredients.actions";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import BulkIngredients from "./bulk-ingredients";
import AnimatedCheckIcon from "./animated-check-icon";

export default function OnboardingTrigger() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const bulkIngredients = useAppSelector(selectBulkIngredients);
  const ingredientsData = useAppSelector(selectIngredients);

  const remainingIngredients = bulkIngredients.filter(
    (item) => !ingredientsData.find((rm) => rm.name === item.name)
  );
  useEffect(() => {
    if (bulkIngredients.length === 0) {
      dispatch(fetchBulkIngredients());
    }
  }, [bulkIngredients, dispatch]);

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button variant="link">Import Data</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerTitle>
        <DrawerDescription>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerDescription>
        {remainingIngredients.length !== 0 ? (
          <BulkIngredients ingredients={remainingIngredients} />
        ) : (
          <div className="h-[calc(100vh-180px)] flex flex-col justify-center items-center">
            <AnimatedCheckIcon
              isVisible={remainingIngredients.length === 0}
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
