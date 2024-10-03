import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "@/types";

export interface IngredientsState {
  ingredients: Ingredient[];
  bulkIngredients: Ingredient[];
}

const initialState: IngredientsState = {
  ingredients: [],
  bulkIngredients: [],
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
    setBulkItems(state, action: PayloadAction<{ ingredients: Ingredient[] }>) {
      state.bulkIngredients = action.payload.ingredients;
    },
  },
});

export const ingredientsActions = ingredientsSlice.actions;

export default ingredientsSlice;
