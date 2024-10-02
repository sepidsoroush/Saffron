import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addIngredient } from "@/store/ingredients/ingredients.actions";
import { addMeal } from "@/store/meals/meals.actions";
import { addComposition } from "@/store/compositions/compositions.actions";
import { uiActions } from "@/store/ui/ui-slice";
import { selectLoading } from "@/store/ui/ui.selector";
import OnboardingList from "./onboarding-list";
import { LoadingSpinner } from "../ui/loading-spinner";
import { uniqueId } from "@/lib/utils";
import { Ingredient, Meal } from "@/types";

type Props = {
  meals: Meal[];
  ingredients: Ingredient[];
};

export default function BulkMeals({ meals, ingredients }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const [selectedValues, setSelectedValues] = useState<number[]>(
    meals.map((option) => option.id)
  );

  const toggleOption = (value: number) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const selectAll = () => {
    setSelectedValues(meals.map((option) => option.id));
  };

  const deselectAll = () => setSelectedValues([]);

  const submitSelected = async () => {
    try {
      dispatch(uiActions.setLoading(true));

      const selectedMeals = meals.filter((meal) =>
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
            ingredients.find((ingredient) => ingredient.id === ingredientId)
          );

          const uniqueIngredients = Array.from(
            new Set(mealIngredients?.filter(Boolean))
          );

          // Step 3: Dispatch addIngredient for each unique ingredient
          await Promise.all(
            uniqueIngredients.map(async (ingredient) => {
              const ingredientId = uniqueId();
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
      dispatch(uiActions.setLoading(false));
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <OnboardingList
          options={meals}
          selectedValues={selectedValues}
          onToggleOption={toggleOption}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
          onSubmit={submitSelected}
        />
      )}
    </div>
  );
}
