import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "@/types";
import { WeekDay } from "@/types/constants";

export interface ScheduleState {
  schedule: Schedule[];
}

const initialState: ScheduleState = {
  schedule: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ schedule: Schedule[] }>) {
      state.schedule = action.payload.schedule;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.schedule = state.schedule.filter(
        (item) => item.day !== action.payload
      );
    },
    addItem: (
      state,
      action: PayloadAction<{ day: WeekDay; schedule: Schedule }>
    ) => {
      const { day, schedule } = action.payload;
      const index = state.schedule.findIndex((item) => item.day === day);
      if (index !== -1) {
        state.schedule[index] = schedule;
      }
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice;
