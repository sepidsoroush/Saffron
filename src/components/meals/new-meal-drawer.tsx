import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MealForm from "@/components/meals/meal-form";
import { AddCircleFill } from "../shared/icons";

const NewMealDrawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="text-orange-500">
          <AddCircleFill width={30} height={30} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full px-4">
          <MealForm actionType="create" setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NewMealDrawer;
