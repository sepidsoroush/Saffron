import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Composition } from "@/types";

export interface CompositionsState {
  compositions: Composition[];
  selectedCompositions: Composition[];
}

const initialState: CompositionsState = {
  compositions: [],
  selectedCompositions: [],
};

const compositionsSlice = createSlice({
  name: "compositions",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ compositions: Composition[] }>) {
      state.compositions = action.payload.compositions;
    },
    addItem: (state, action: PayloadAction<Composition>) => {
      state.compositions.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.compositions = state.compositions.filter(
        (row) => row.id !== action.payload
      );
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; composition: Composition }>
    ) => {
      const { id, composition } = action.payload;
      const index = state.compositions.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.compositions[index] = composition;
      }
    },
    findItemsByMealId: (state, action: PayloadAction<Composition[]>) => {
      state.selectedCompositions = action.payload;
    },
  },
});

export const compositionsActions = compositionsSlice.actions;

export default compositionsSlice;
