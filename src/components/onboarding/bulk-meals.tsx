import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addIngredient,
  fetchBulkIngredients,
} from "@/store/ingredients/ingredients.actions";
import { addMeal, fetchBulkMeals } from "@/store/meals/meals.actions";
import { addComposition } from "@/store/compositions/compositions.actions";
import {
  selectIngredients,
  selectBulkIngredients,
} from "@/store/ingredients/ingredients.selector";
import { selectBulkMeals, selectMeals } from "@/store/meals/meals.selector";

import OnboardingList from "./onboarding-list";

import { uniqueId } from "@/lib/utils";

type Props = {
  goToNextStep: () => void;
  onChangeAmount: Dispatch<SetStateAction<number>>;
};

export default function BulkMeals({ goToNextStep, onChangeAmount }: Props) {
  const dispatch = useAppDispatch();
  const currentIngredients = useAppSelector(selectIngredients);

  const bulkMeals = useAppSelector(selectBulkMeals);
  const bulkIngredients = useAppSelector(selectBulkIngredients);
  const currentMealsData = useAppSelector(selectMeals);

  const remainingMeals = bulkMeals.filter(
    (item) => !currentMealsData.find((rm) => rm.name === item.name)
  );

  const [selectedValues, setSelectedValues] = useState<number[]>(
    remainingMeals.map((option) => option.id)
  );

  useEffect(() => {
    if (bulkMeals.length === 0) {
      dispatch(fetchBulkMeals());
    }
    if (bulkIngredients.length === 0) {
      dispatch(fetchBulkIngredients());
    }
  }, [bulkMeals, bulkIngredients, dispatch]);

  const toggleOption = (value: number) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const selectAll = () => {
    setSelectedValues(remainingMeals.map((option) => option.id));
  };

  const deselectAll = () => setSelectedValues([]);

  const submitSelected = async () => {
    try {
      const selectedMeals = remainingMeals.filter((meal) =>
        selectedValues.includes(meal.id)
      );

      // Step 1: Dispatch addMeal for all selected meals
      await Promise.all(
        selectedMeals.map(async (meal) => {
          const mealId = uniqueId();
          await dispatch(
            addMeal({
              id: mealId,
              name: meal.name,
              imageUrl: meal.imageUrl,
              liked: false,
            })
          );

          // Step 2: Find unique ingredients for this meal
          const mealIngredients = meal.ingredientIds?.map((ingredientId) =>
            bulkIngredients.find((ingredient) => ingredient.id === ingredientId)
          );

          const uniqueIngredients = Array.from(
            new Set(mealIngredients?.filter(Boolean))
          );

          // Step 3: Dispatch addIngredient for new ingredients and handle compositions
          await Promise.all(
            uniqueIngredients.map(async (ingredient) => {
              // Check if the ingredient already exists in currentIngredients
              const existingIngredient = currentIngredients.find(
                (currIng) => currIng.name === ingredient?.name
              );

              let ingredientId: number;

              if (existingIngredient) {
                // Use existing ingredient's ID if it exists
                ingredientId = existingIngredient.id;
              } else {
                // Otherwise, dispatch addIngredient and create a new ingredient
                ingredientId = uniqueId();
                await dispatch(
                  addIngredient({
                    ...ingredient,
                    id: ingredientId,
                    name: ingredient?.name ?? "Unnamed Ingredient",
                    available: false,
                    isImported: true,
                    category: ingredient?.category,
                  })
                );
              }

              // Step 4: Dispatch addComposition for each meal-ingredient relationship
              await dispatch(
                addComposition({
                  id: uniqueId(),
                  meal_id: mealId,
                  ingredient_id: ingredientId,
                })
              );
            })
          );
        })
      );
    } catch (error) {
      console.error("Error submitting meals and ingredients:", error);
    } finally {
      goToNextStep();

      onChangeAmount(selectedValues.length);
    }
  };

  return (
    <OnboardingList
      options={remainingMeals}
      selectedValues={selectedValues}
      onToggleOption={toggleOption}
      onSelectAll={selectAll}
      onDeselectAll={deselectAll}
      onSubmit={submitSelected}
      goToNextStep={goToNextStep}
    />
  );
}
