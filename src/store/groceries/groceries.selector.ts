import { RootState } from "@/store";

export const selectGroceries = (state: RootState) => state.groceries.groceries;
