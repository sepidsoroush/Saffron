import React, { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MealForm from "@/components/meals/meal-form";
import { AddCircleFill } from "../shared/icons";

const NewMealDrawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const ModalComponent = isDesktop ? Sheet : Drawer;
  const TriggerComponent = isDesktop ? SheetTrigger : DrawerTrigger;
  const ContentComponent = isDesktop ? SheetContent : DrawerContent;

  return (
    <ModalComponent open={open} onOpenChange={setOpen}>
      <TriggerComponent asChild>
        <div className="text-orange-500">
          <AddCircleFill width={30} height={30} />
        </div>
      </TriggerComponent>
      <ContentComponent>
        <div className="w-full px-4">
          <MealForm actionType="create" setOpen={setOpen} />
        </div>
      </ContentComponent>
    </ModalComponent>
  );
};

export default NewMealDrawer;
