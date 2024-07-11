import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    deleteItem(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (row) => row.id !== action.payload
      );
    },
    addItem(state, action: PayloadAction<Ingredient>) {
      state.ingredients.push(action.payload);
    },
    updateItem(
      state,
      action: PayloadAction<{ id: string; ingredient: Ingredient }>
    ) {
      const { id, ingredient } = action.payload;
      const index = state.ingredients.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.ingredients[index] = ingredient;
      }
    },
  },
});

export const ingredientsActions = ingredientsSlice.actions;
export default ingredientsSlice;
