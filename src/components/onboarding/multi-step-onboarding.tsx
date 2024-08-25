import { useState } from "react";

import { Button } from "@/components/ui/button";

import BulkIngredients from "./bulk-ingredients";
import BulkMeals from "./bulk-meals";
import CompletedOnboarding from "./completed-onboarding";
import StepperIndicator from "./stepper-indicator";

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <BulkIngredients />;
    case 2:
      return <BulkMeals />;
    case 3:
      return <CompletedOnboarding />;

    default:
      return "Unknown step";
  }
}

const MultiStepOnboarding = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = async () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <StepperIndicator activeStep={activeStep} />

      {getStepContent(activeStep)}
      <div className="flex justify-center space-x-[20px]">
        <Button
          type="button"
          className="w-[100px]"
          variant="secondary"
          onClick={handleBack}
          disabled={activeStep === 1}
        >
          Back
        </Button>
        {activeStep === 3 ? (
          <Button
            className="w-[100px]"
            type="button"
            onClick={() => console.log("Completed!")}
          >
            Done
          </Button>
        ) : (
          <Button type="button" className="w-[100px]" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepOnboarding;
