import { useState, Dispatch, SetStateAction } from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import StepperIndicator from "./stepper-indicator";
import BulkMeals from "./bulk-meals";
import BulkIngredients from "./bulk-ingredients";
import CompletedOnboarding from "./completed-onboarding";

type Props = {
  activeStep: number;
  handleNext: () => void;
  addedMealAmount: number;
  addedIngAmount: number;
  setAddedMealAmount: Dispatch<SetStateAction<number>>;
  setAddedIngAmount: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function getStepContent({
  activeStep,
  handleNext,
  addedMealAmount,
  addedIngAmount,
  setAddedMealAmount,
  setAddedIngAmount,
  setOpen,
}: Props) {
  switch (activeStep) {
    case 1:
      return (
        <BulkMeals
          goToNextStep={handleNext}
          onChangeAmount={setAddedMealAmount}
        />
      );
    case 2:
      return (
        <BulkIngredients
          goToNextStep={handleNext}
          onChangeAmount={setAddedIngAmount}
        />
      );
    case 3:
      return (
        <CompletedOnboarding
          addedMealAmount={addedMealAmount}
          addedIngAmount={addedIngAmount}
          setOpen={setOpen}
        />
      );
    default:
      return "Unknown step";
  }
}

export default function OnboardingTrigger() {
  const [open, setOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [addedMealAmount, setAddedMealAmount] = useState<number>(0);
  const [addedIngAmount, setAddedIngAmount] = useState<number>(0);

  const handleNext = async () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button variant="link" className="px-0 mx-0">
          Recipe suggestions
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>
          <VisuallyHidden.Root>Recipe suggestions</VisuallyHidden.Root>
        </DrawerTitle>
        <DrawerDescription>
          <VisuallyHidden.Root>Recipe suggestions</VisuallyHidden.Root>
        </DrawerDescription>

        <div>
          <StepperIndicator
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
          {getStepContent({
            activeStep,
            handleNext,
            addedMealAmount,
            addedIngAmount,
            setAddedMealAmount,
            setAddedIngAmount,
            setOpen,
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
