import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectBulkIngredients = (state: RootState) =>
  state.ingredients.bulkIngredients;

const selectSchedule = (state: RootState) => state.schedule.schedule;
const selectCompositions = (state: RootState) =>
  state.compositions.compositions;

export const selectMealIdsInSchedule = createSelector(
  [selectSchedule],
  (schedule) => schedule.map((item) => Number(item.meal_id)).filter(Boolean)
);

export const selectFilteredCompositions = createSelector(
  [selectCompositions, selectMealIdsInSchedule],
  (compositionsData, mealIdsInSchedule) =>
    compositionsData.filter((item) => mealIdsInSchedule.includes(item.meal_id))
);

export const selectIngredientIdsInSchedule = createSelector(
  [selectFilteredCompositions],
  (filteredCompositions) =>
    filteredCompositions.map((item) => item.ingredient_id)
);

export const selectEssentialItems = createSelector(
  [selectIngredients, selectIngredientIdsInSchedule],
  (ingredients, ingredientIdsInSchedule) =>
    ingredients
      .filter((item) => ingredientIdsInSchedule.includes(item.id))
      .filter((item) => !item.available)
);

export const selectEssentialItemsLength = createSelector(
  [selectEssentialItems],
  (essentialItems) => essentialItems.length
);

export const selectIngredientsLength = createSelector(
  [selectIngredients],
  (items) => items.length
);

export const selectIngredientsByCategory = (category: string) =>
  createSelector([selectIngredients], (ingredients) =>
    ingredients.filter((ing) => ing.category === category)
  );
