import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { compositionsActions } from "../features/composition-slice";
import { uiActions } from "../features/ui-slice";
import { Composition } from "@/types";

export function fetchCompositions() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase.from("compositions").select("*");
      if (error) {
        console.error("Error fetching compositions:", error);
      }
      if (data === null) {
        throw new Error("Data returned from Supabase is null");
      }
      dispatch(compositionsActions.setItems({ compositions: data }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function fetchCompositionsByMealId(mealId: number) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase
        .from("compositions")
        .select()
        .eq("meal_id", mealId);
      if (error) {
        console.error("Error fetching selected compositions:", error);
        throw error;
      }
      if (!data) {
        dispatch(compositionsActions.findItemsByMealId([]));
      } else {
        dispatch(compositionsActions.findItemsByMealId(data));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      dispatch(compositionsActions.findItemsByMealId([]));
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addComposition(composition: Composition) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase
        .from("compositions")
        .insert([composition])
        .select();
      if (error) {
        console.error("Error adding composition:", error);
      }
      dispatch(compositionsActions.addItem(composition));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
}

export function updateComposition(id: number, composition: Composition) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase
        .from("compositions")
        .update(composition)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating composition:", error);
      }
      dispatch(compositionsActions.updateItem({ id, composition }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
