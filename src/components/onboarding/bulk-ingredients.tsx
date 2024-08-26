import { useEffect, Dispatch, SetStateAction } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectBulkIngredients } from "@/store/ingredients/ingredients.selector";
import { fetchBulkIngredients } from "@/store/ingredients/ingredients.actions";
import OnboardingList from "./onboarding-list";
import { ingredientDataAsSelectOptions } from "@/lib/utils";
import { SelectOption } from "@/types/common-ui";

interface BulkIngredientsProps {
  ingredients: string[];
  setIngredients: Dispatch<SetStateAction<string[]>>;
}

export default function BulkIngredients({
  ingredients,
  setIngredients,
}: BulkIngredientsProps) {
  const dispatch = useAppDispatch();
  const bulkIngredients = useAppSelector(selectBulkIngredients);
  const ingredientSelectOptions: SelectOption[] =
    ingredientDataAsSelectOptions(bulkIngredients);

  useEffect(() => {
    if (bulkIngredients.length === 0) {
      dispatch(fetchBulkIngredients());
    }
  }, [bulkIngredients, dispatch]);

  const toggleOption = (value: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.includes(value)
        ? prevIngredients.filter((v) => v !== value)
        : [...prevIngredients, value]
    );
  };

  const selectAll = () => {
    setIngredients(ingredientSelectOptions.map((option) => option.value));
  };

  const deselectAll = () => {
    setIngredients([]);
  };

  return (
    <OnboardingList
      options={ingredientSelectOptions}
      selectedValues={ingredients}
      onToggleOption={toggleOption}
      onSelectAll={selectAll}
      onDeselectAll={deselectAll}
    />
  );
}
