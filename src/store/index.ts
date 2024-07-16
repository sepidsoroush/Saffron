import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./features/meals-slice";
import ingredientsSlice from "./features/ingredients-slice";
import scheduleSlice from "./features/schedule-slice";
import compositionsSlice from "./features/composition-slice";
import uiSlice from "./features/ui-slice";

const store = configureStore({
  reducer: {
    meals: mealsSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    schedule: scheduleSlice.reducer,
    composition: compositionsSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
