import { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import BulkIngredients from "./bulk-ingredients";
import BulkMeals from "./bulk-meals";
import CompletedOnboarding from "./completed-onboarding";
import StepperIndicator from "./stepper-indicator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addIngredient } from "@/store/ingredients/ingredients.actions";
import { selectBulkIngredients } from "@/store/ingredients/ingredients.selector";
import { uniqueId, ingredientDataAsSelectOptions } from "@/lib/utils";
import { SelectOption } from "@/types/common-ui";

function getStepContent(
  step: number,
  ingredients: string[],
  setIngredients: Dispatch<SetStateAction<string[]>>
  // meals: string[],
  // setMeals: Dispatch<SetStateAction<string[]>>
) {
  switch (step) {
    case 1:
      return (
        <BulkIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      );
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
  const [ingredients, setIngredients] = useState<string[]>([]);
  // const [meals, setMeals] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const bulkIngredients = useAppSelector(selectBulkIngredients);
  const ingredientSelectOptions: SelectOption[] =
    ingredientDataAsSelectOptions(bulkIngredients);

  const handleNext = async () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(
        ingredients.map((value) => {
          const option = ingredientSelectOptions.find(
            (opt) => opt.value === value
          );
          if (!option) {
            throw new Error(`Ingredient with value ${value} not found.`);
          }

          return dispatch(
            addIngredient({
              id: uniqueId(),
              name: option.label,
              available: false,
              public_ingredient_id: Number(option.value),
            })
          );
        })
      );
      // Optionally, handle meals submission or other data here
    } catch (error) {
      console.error("Error adding ingredients:", error);
    }
  };

  return (
    <div>
      <StepperIndicator activeStep={activeStep} />
      {getStepContent(activeStep, ingredients, setIngredients)}
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
          <Button className="w-[100px]" type="button" onClick={handleSubmit}>
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
