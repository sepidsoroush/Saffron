import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectMealById } from "@/store/meals/meals.selector";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MealForm from "@/components/meals/meal-form";

const EditMealDrawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const mealToUpdate = useAppSelector(selectMealById(mealId));

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>Edit meal</DrawerTrigger>
      <DrawerContent>
        <div className="w-full px-4">
          <MealForm
            actionType="update"
            setOpen={setOpen}
            mealToUpdate={mealToUpdate}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditMealDrawer;
