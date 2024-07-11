import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./features/meals-slice";
import ingredientsSlice from "./features/ingredients-slice";
import uiSlice from "./features/ui-slice";

const store = configureStore({
  reducer: {
    meals: mealsSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
