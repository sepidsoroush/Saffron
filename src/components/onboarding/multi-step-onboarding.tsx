import { useState } from "react";
import BulkIngredients from "./bulk-ingredients";
import BulkMeals from "./bulk-meals";
import CompletedOnboarding from "./completed-onboarding";
import StepperIndicator from "./stepper-indicator";

function getStepContent(step: number, handleNext: () => void) {
  switch (step) {
    case 1:
      return <BulkMeals goToNextStep={handleNext} />;
    case 2:
      return <BulkIngredients goToNextStep={handleNext} />;
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

  return (
    <div>
      <StepperIndicator activeStep={activeStep} setActiveStep={setActiveStep} />
      {getStepContent(activeStep, handleNext)}
    </div>
  );
};
export default MultiStepOnboarding;
