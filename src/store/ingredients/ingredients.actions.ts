import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { ingredientsActions } from "./ingredients.slice";
import { uiActions } from "../ui/ui-slice";
import { Ingredient } from "@/types";

export function fetchIngredients() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase.from("ingredients").select("*");
      if (error) {
        console.error("Error fetching ingredients:", error);
      }
      if (data === null) {
        throw new Error("Data returned from Supabase is null");
      }
      dispatch(ingredientsActions.setItems({ ingredients: data }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addIngredient(ingredient: Ingredient) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase
        .from("ingredients")
        .insert([ingredient])
        .select();
      if (error) {
        console.error("Error adding ingredient:", error);
      }
      dispatch(ingredientsActions.addItem(ingredient));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
}

export function updateIngredient(id: number, ingredient: Ingredient) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase
        .from("ingredients")
        .update(ingredient)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating ingredient:", error);
      }
      dispatch(ingredientsActions.updateItem({ id, ingredient }));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
}

export function deleteIngredient(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase
        .from("ingredients")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error(`Error deleting ingredient: ${error.message}`);
      }
      dispatch(ingredientsActions.deleteItem(id));
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
