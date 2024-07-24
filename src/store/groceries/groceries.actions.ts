import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { groceriesActions } from "./groceries.slice";
import { uiActions } from "../ui/ui-slice";
import { Grocery } from "@/types";

export function fetchGroceries() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase.from("groceries").select("*");
      if (error) {
        console.error("Error fetching groceries:", error);
      }
      if (data === null) {
        throw new Error("Data returned from Supabase is null");
      }
      dispatch(groceriesActions.setItems({ groceries: data }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addGrocery(grocery: Grocery) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase
        .from("groceries")
        .insert([grocery])
        .select();
      if (error) {
        console.error("Error adding grocery:", error);
      }
      dispatch(groceriesActions.addItem(grocery));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
}

export function updateGrocery(id: number, grocery: Grocery) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase
        .from("groceries")
        .update(grocery)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating grocery:", error);
      }
      dispatch(groceriesActions.updateItem({ id, grocery }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function deleteGrocery(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase.from("groceries").delete().eq("id", id);
      if (error) {
        throw new Error(`Error deleting grocery: ${error.message}`);
      }
      dispatch(groceriesActions.deleteItem(id));
    } catch (error) {
      console.error("Error deleting grocery:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
