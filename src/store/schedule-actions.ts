import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { scheduleActions } from "./features/schedule-slice";
import { uiActions } from "./features/ui-slice";
// import { Schedule } from "@/types";
import { WeekDay } from "@/types/constants";

export function fetchSchedule() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase.from("schedule").select("*");
      if (error) {
        console.error("Error fetching schedule:", error);
      }
      if (data === null) {
        throw new Error("Data returned from Supabase is null");
      }
      dispatch(scheduleActions.setItems({ schedule: data }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function deleteSchedule(day: WeekDay) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase.from("schedule").delete().eq("day", day);
      if (error) {
        throw new Error(`Error deleting schedule: ${error.message}`);
      }
      dispatch(scheduleActions.deleteItem(day));
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
export function addSchedule(day: WeekDay, mealId: number) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase
        .from("schedule")
        .update(mealId)
        .eq("day", day)
        .select();

      if (error) {
        console.error("Error adding schedule:", error);
      }
      dispatch(scheduleActions.addItem({ day, mealId }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
