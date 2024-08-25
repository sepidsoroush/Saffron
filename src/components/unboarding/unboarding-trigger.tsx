import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectBulkIngredients } from "@/store/ingredients/ingredients.selector";
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

import MultiStepUnboarding from "./multi-step-unboarding";

export default function UnboardingTrigger() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const bulkIngredients = useAppSelector(selectBulkIngredients);

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
        <div className="mt-4 border-t">
          <MultiStepUnboarding />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
