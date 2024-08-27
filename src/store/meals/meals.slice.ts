import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "@/types";

export interface MealsState {
  meals: Meal[];
  bulkMeals: Meal[];
}

const initialState: MealsState = {
  meals: [],
  bulkMeals: [],
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ meals: Meal[] }>) {
      state.meals = action.payload.meals;
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.meals = state.meals.filter((row) => row.id !== action.payload);
    },
    addItem(state, action: PayloadAction<Meal>) {
      state.meals = state.meals.concat(action.payload);
    },
    updateItem(state, action: PayloadAction<{ id: number; meal: Meal }>) {
      const { id, meal } = action.payload;
      const index = state.meals.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.meals[index] = meal;
      }
    },
    setBulkItems(state, action: PayloadAction<{ meals: Meal[] }>) {
      state.bulkMeals = action.payload.meals;
    },
  },
});

export const mealsActions = mealsSlice.actions;
export default mealsSlice;
