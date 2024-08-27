import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { selectBulkIngredients } from "@/store/ingredients/ingredients.selector";
import { addIngredient } from "@/store/ingredients/ingredients.actions";

import OnboardingList from "./onboarding-list";
import { ingredientDataAsSelectOptions, uniqueId } from "@/lib/utils";
import { SelectOption } from "@/types/common-ui";

export default function BulkIngredients() {
  const dispatch = useAppDispatch();

  const bulkIngredients = useAppSelector(selectBulkIngredients);
  const ingredientSelectOptions: SelectOption[] =
    ingredientDataAsSelectOptions(bulkIngredients);

  const [selectedValues, setSelectedValues] = useState<string[]>(
    ingredientSelectOptions.map((option) => option.value)
  );

  const toggleOption = (value: string) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const selectAll = () => {
    setSelectedValues(ingredientSelectOptions.map((option) => option.value));
  };

  const deselectAll = () => setSelectedValues([]);

  const submitSelected = async () => {
    try {
      await Promise.all(
        selectedValues.map((value) => {
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
              isImported: true,
            })
          );
        })
      );
    } catch (error) {
      console.error("Error adding ingredients:", error);
    }
  };

  return (
    <div>
      <OnboardingList
        options={ingredientSelectOptions}
        selectedValues={selectedValues}
        onToggleOption={toggleOption}
        onSelectAll={selectAll}
        onDeselectAll={deselectAll}
        onSubmit={submitSelected}
      />
    </div>
  );
}
