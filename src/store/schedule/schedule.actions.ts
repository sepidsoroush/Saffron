import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { scheduleActions } from "./schedule.slice";
import { uiActions } from "../ui/ui-slice";
import { WeekDay } from "@/types/constants";
import { Schedule } from "@/types";

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
      const { error } = await supabase
        .from("schedule")
        .update({ meal_id: null })
        .eq("day", day)
        .select();
      if (error) {
        throw new Error(`Error deleting schedule: ${error.message}`);
      }
      dispatch(scheduleActions.clearMealId(day));
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function updateSchedule(day: WeekDay, mealId: number) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase
        .from("schedule")
        .update({ meal_id: mealId })
        .eq("day", day)
        .select();

      if (error) {
        console.error("Error adding schedule:", error);
      }
      dispatch(scheduleActions.updateItem({ day, mealId }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addSchedule(schedule: Schedule) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase
        .from("schedule")
        .insert([schedule])
        .select();
      if (error) {
        console.error("Error adding schedule:", error);
      }
      dispatch(scheduleActions.addItem(schedule));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
}
