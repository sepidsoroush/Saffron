import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { mealsActions } from "./meals.slice";
import { uiActions } from "../ui/ui-slice";
import { Meal } from "@/types";

export function fetchMeals() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase.from("meals").select("*");
      if (error) {
        console.error("Error fetching meals:", error);
      }
      if (data === null) {
        throw new Error("Data returned from Supabase is null");
      }
      dispatch(mealsActions.setItems({ meals: data }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function deleteMeal(mealID: number) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase.from("meals").delete().eq("id", mealID);
      if (error) {
        throw new Error(`Error deleting meal: ${error.message}`);
      }
      dispatch(mealsActions.deleteItem(mealID));
    } catch (error) {
      console.error("Error deleting meal:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addMeal(meal: Meal) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase.from("meals").insert([meal]).select();
      if (error) {
        console.error("Error adding meal:", error);
      }
      dispatch(mealsActions.addItem(meal));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
}

export function updateMeal(id: number, meal: Meal) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase
        .from("meals")
        .update(meal)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating meal:", error);
      }
      dispatch(mealsActions.updateItem({ id, meal }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function fetchBulkMeals() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase.from("public_meals").select("*");
      if (error) {
        console.error("Error fetching bulk meals:", error);
      }
      if (data === null) {
        throw new Error("Data returned from Supabase is null");
      }
      dispatch(mealsActions.setBulkItems({ meals: data }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
