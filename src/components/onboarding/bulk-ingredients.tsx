import { useState, Dispatch, SetStateAction } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addIngredient } from "@/store/ingredients/ingredients.actions";
import { selectIngredients } from "@/store/ingredients/ingredients.selector";

import OnboardingList from "./onboarding-list";
import { uniqueId } from "@/lib/utils";
import { Ingredient } from "@/types";
import jsonIngredients from "@/__mock/ingredients.json";

type Props = {
  goToNextStep: () => void;
  onChangeAmount: Dispatch<SetStateAction<number>>;
};

export default function BulkIngredients({
  goToNextStep,
  onChangeAmount,
}: Props) {
  const dispatch = useAppDispatch();
  const bulkIngredients: Ingredient[] = jsonIngredients;

  const currentIngredientsData = useAppSelector(selectIngredients);
  const remainingIngredients = bulkIngredients.filter(
    (item) => !currentIngredientsData.find((rm) => rm.name === item.name)
  );

  const [selectedValues, setSelectedValues] = useState<number[]>(
    remainingIngredients.map((option) => option.id)
  );

  const toggleOption = (value: number) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const selectAll = () => {
    setSelectedValues(remainingIngredients.map((option) => option.id));
  };

  const deselectAll = () => setSelectedValues([]);

  const submitSelected = async () => {
    try {
      await Promise.all(
        selectedValues.map((value) => {
          const option = remainingIngredients.find((opt) => opt.id === value);
          if (!option) {
            throw new Error(`Ingredient with value ${value} not found.`);
          }
          return dispatch(
            addIngredient({
              ...option,
              id: uniqueId(),
              name: option?.name,
              available: false,
              isImported: true,
              category: option?.category,
            })
          );
        })
      );
    } catch (error) {
      console.error("Error adding ingredients:", error);
    } finally {
      goToNextStep();

      onChangeAmount(selectedValues.length);
    }
  };

  return (
    <div>
      <OnboardingList
        options={remainingIngredients}
        selectedValues={selectedValues}
        onToggleOption={toggleOption}
        onSelectAll={selectAll}
        onDeselectAll={deselectAll}
        onSubmit={submitSelected}
        goToNextStep={goToNextStep}
      />
    </div>
  );
}
