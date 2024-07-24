import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store";

export const selectGroceries = (state: RootState) => state.groceries.groceries;

export const selectNeedToPurchaseGroceries = createSelector(
  [selectGroceries],
  (items) => items.filter((item) => !item.available)
);

export const selectAvailableGroceries = createSelector(
  [selectGroceries],
  (items) => items.filter((item) => item.available)
);

export const selectNumberOfGroceries = createSelector(
  [selectGroceries],
  (items) => items.length
);
