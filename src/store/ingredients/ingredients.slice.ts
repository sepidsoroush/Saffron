import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { Ingredient } from "@/types";

export interface IngredientsState {
  ingredients: Ingredient[];
}

const initialState: IngredientsState = {
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ ingredients: Ingredient[] }>) {
      state.ingredients = action.payload.ingredients;
    },
    addItem: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; ingredient: Ingredient }>
    ) => {
      const { id, ingredient } = action.payload;
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );
      if (index !== -1) {
        state.ingredients[index] = ingredient;
      }
    },
  },
});

export const ingredientsActions = ingredientsSlice.actions;

// Selectors
const selectIngredients = (state: RootState) => state.ingredients.ingredients;
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

export const selectNeedToPurchase = createSelector(
  [selectIngredients, selectIngredientIdsInSchedule],
  (ingredients, ingredientIdsInSchedule) =>
    ingredients
      .filter((item) => !ingredientIdsInSchedule.includes(item.id))
      .filter((item) => !item.available)
);

export const selectAvailableIngredients = createSelector(
  [selectIngredients],
  (ingredients) => ingredients.filter((item) => item.available)
);

export const selectEssentialItemsLength = createSelector(
  [selectEssentialItems],
  (essentialItems) => essentialItems.length
);

export default ingredientsSlice;
