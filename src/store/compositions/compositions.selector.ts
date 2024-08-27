import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const selectCompositions = (state: RootState) =>
  state.compositions.compositions;
const selectIngredients = (state: RootState) => state.ingredients.ingredients;

export const selectCompositionsByMealId = createSelector(
  [
    selectCompositions,
    selectIngredients,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const selectBulkCompositions = (state: RootState) =>
  state.compositions.bulkCompositions;

export const selectBulkCompositionsByMealId = createSelector(
  [
    selectBulkCompositions,
    selectIngredients,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
