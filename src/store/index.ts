import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./meals/meals.slice";
import ingredientsSlice from "./ingredients/ingredients.slice";
import scheduleSlice from "./schedule/schedule.slice";
import compositionsSlice from "./compositions/compositions.slice";
import groceriesSlice from "./groceries/groceries.slice";
import uiSlice from "./ui/ui-slice";

const store = configureStore({
  reducer: {
    meals: mealsSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    schedule: scheduleSlice.reducer,
    compositions: compositionsSlice.reducer,
    groceries: groceriesSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
