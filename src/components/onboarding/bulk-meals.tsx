import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addIngredient } from "@/store/ingredients/ingredients.actions";
import { addMeal } from "@/store/meals/meals.actions";
import { addComposition } from "@/store/compositions/compositions.actions";
import { selectIngredients } from "@/store/ingredients/ingredients.selector";

import OnboardingList from "./onboarding-list";

import { uniqueId } from "@/lib/utils";
import { Ingredient, Meal } from "@/types";

type Props = {
  remainingMeals: Meal[];
  bulkIngredients: Ingredient[];
};

export default function BulkMeals({ remainingMeals, bulkIngredients }: Props) {
  const dispatch = useAppDispatch();
  const currentIngredients = useAppSelector(selectIngredients);

  const [selectedValues, setSelectedValues] = useState<number[]>(
    remainingMeals.map((option) => option.id)
  );

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
              cuisine: meal.cuisine,
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
    />
  );
}
