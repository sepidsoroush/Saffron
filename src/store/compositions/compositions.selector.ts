import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const selectCompositions = (state: RootState) =>
  state.compositions.compositions;
const selectIngredients = (state: RootState) => state.ingredients.ingredients;

export const selectCompositionsByMealId = createSelector(
  [
    selectCompositions,
    selectIngredients,
    (state: RootState, mealId: number) => mealId,
  ],
  (compositions, ingredients, mealId) => {
    const compositionsForMeal = compositions.filter(
      (comp) => comp.meal_id === mealId
    );
    return compositionsForMeal.map((comp) => ({
      ...comp,
      ingredient: ingredients.find((ing) => ing.id === comp.ingredient_id),
    }));
  }
);
