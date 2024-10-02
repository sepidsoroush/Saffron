import { useState } from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import MultiStepOnboarding from "./multi-step-onboarding";

export default function OnboardingTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button variant="link" className="px-0 mx-0">
          Recipe suggestions
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerTitle>
        <DrawerDescription>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerDescription>

        <MultiStepOnboarding />
      </DrawerContent>
    </Drawer>
  );
}
