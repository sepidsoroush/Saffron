import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import MealForm from "@/components/meals/meal-form";
import { AddCircleFill } from "../shared/icons";

const NewMealDrawer: React.FC = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="text-orange-500">
          <AddCircleFill width={30} height={30} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-h-[80vh] ">
          <DrawerHeader className="w-full flex flex-row justify-between items-center text-[17px] font-semibold text-neutral-400">
            <DrawerClose>Cancel</DrawerClose>
            <DrawerTitle className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200 ">
              New meal
            </DrawerTitle>
            <div>Save</div>
          </DrawerHeader>
          <div className="w-full p-4 gap-3">
            <MealForm actionType="create" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NewMealDrawer;
