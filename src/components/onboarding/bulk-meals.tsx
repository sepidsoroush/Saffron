import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addIngredient } from "@/store/ingredients/ingredients.actions";
import { addMeal } from "@/store/meals/meals.actions";
import { addComposition } from "@/store/compositions/compositions.actions";
import { selectIngredients } from "@/store/ingredients/ingredients.selector";

import OnboardingList from "./onboarding-list";
import { showSuccessToast, uniqueId } from "@/lib/utils";
import { Ingredient, Meal } from "@/types";

type Props = {
  remainingMeals: Meal[];
  bulkIngredients: Ingredient[];
  closeDrawerHandler: () => void;
};

export default function BulkMeals({
  remainingMeals,
  bulkIngredients,
  closeDrawerHandler,
}: Props) {
  const dispatch = useAppDispatch();
  const currentIngredients = useAppSelector(selectIngredients);

  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const MINIMUM_LOADER_TIME = 3000; // minimum time in milliseconds
    const startTime = Date.now();

    setIsLoading(true); // Start the loader
    try {
      const selectedMeals = remainingMeals.filter((meal) =>
        selectedValues.includes(meal.id)
      );

      // Step 1: Collect all unique ingredients across all selected meals
      const allIngredients = selectedMeals.flatMap((meal) =>
        meal.ingredientIds?.map((ingredientId) =>
          bulkIngredients.find((ingredient) => ingredient?.id === ingredientId)
        )
      );

      const uniqueIngredients = Array.from(
        new Set(allIngredients.filter(Boolean))
      );

      // Temporary Set to track newly added ingredients by name
      const addedIngredientsSet = new Set<string>();

      // Map to store ingredient IDs (either existing or newly added)
      const ingredientIdMap = new Map<string, number>();

      // Step 2: Filter out ingredients that already exist in currentIngredients
      const ingredientsToAdd = uniqueIngredients.filter((ingredient) => {
        const existingIngredient = currentIngredients.find(
          (currIng) => currIng.name === ingredient?.name
        );
        const isAlreadyAdded = addedIngredientsSet.has(ingredient?.name ?? "");

        // If the ingredient exists, map its name to its ID
        if (existingIngredient) {
          ingredientIdMap.set(existingIngredient.name, existingIngredient.id);
        }

        return !existingIngredient && !isAlreadyAdded;
      });

      // Step 3: Add all unique ingredients in bulk
      await Promise.all(
        ingredientsToAdd.map(async (ingredient) => {
          const ingredientId = uniqueId();

          // Add ingredient to the database
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

          // Track the ingredient in the Set and Map
          addedIngredientsSet.add(ingredient?.name ?? "");
          ingredientIdMap.set(ingredient?.name ?? "", ingredientId);
        })
      );

      // Step 4: Now add the meals and their compositions
      await Promise.all(
        selectedMeals.map(async (meal) => {
          const mealId = uniqueId();

          // Add the meal to the database
          await dispatch(
            addMeal({
              id: mealId,
              name: meal.name,
              imageUrl: meal.imageUrl,
              cuisine: meal.cuisine,
              liked: false,
            })
          );

          // Find the ingredient IDs to add to the composition
          const mealIngredients = meal.ingredientIds?.map((ingredientId) =>
            bulkIngredients.find(
              (ingredient) => ingredient?.id === ingredientId
            )
          );

          const uniqueMealIngredients = Array.from(
            new Set(mealIngredients?.filter(Boolean))
          );

          await Promise.all(
            uniqueMealIngredients.map(async (ingredient) => {
              // Resolve the correct ingredient ID (either existing or newly added)
              const existingIngredient = currentIngredients.find(
                (currIng) => currIng.name === ingredient?.name
              );
              const ingredientId = existingIngredient
                ? existingIngredient.id
                : ingredientIdMap.get(ingredient?.name ?? "");

              // Ensure the ingredientId is valid before adding the composition
              if (ingredientId) {
                await dispatch(
                  addComposition({
                    id: uniqueId(),
                    meal_id: mealId,
                    ingredient_id: ingredientId,
                  })
                );
              } else {
                console.error(
                  `Ingredient ID not found for ingredient: ${ingredient?.name}`
                );
              }
            })
          );
        })
      );
    } catch (error) {
      console.error("Error submitting meals and ingredients:", error);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MINIMUM_LOADER_TIME - elapsedTime;

      if (remainingTime > 0) {
        // Delay closing the loader if the elapsed time is less than the minimum loader time
        setTimeout(() => {
          setIsLoading(false); // Hide the loader
          closeDrawerHandler();
          showSuccessToast(
            `${selectedValues.length} new recipes added to your meal list`
          );
        }, remainingTime);
      } else {
        // Close immediately if enough time has passed
        setIsLoading(false); // Hide the loader
        closeDrawerHandler();
        showSuccessToast(
          `${selectedValues.length} new recipes added to your meal list`
        );
      }
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
      isLoading={isLoading}
    />
  );
}
