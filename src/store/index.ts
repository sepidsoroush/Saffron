import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./features/meals-slice";
import uiSlice from "./features/ui-slice";

const store = configureStore({
  reducer: {
    meals: mealsSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
