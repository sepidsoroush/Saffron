import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Grocery } from "@/types";

export interface GroceriesState {
  groceries: Grocery[];
}

const initialState: GroceriesState = {
  groceries: [],
};

const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ groceries: Grocery[] }>) {
      state.groceries = action.payload.groceries;
    },
    addItem: (state, action: PayloadAction<Grocery>) => {
      state.groceries.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.groceries = state.groceries.filter(
        (grocery) => grocery.id !== action.payload
      );
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; grocery: Grocery }>
    ) => {
      const { id, grocery } = action.payload;
      const index = state.groceries.findIndex((grocery) => grocery.id === id);
      if (index !== -1) {
        state.groceries[index] = grocery;
      }
    },
  },
});

export const groceriesActions = groceriesSlice.actions;

export default groceriesSlice;
