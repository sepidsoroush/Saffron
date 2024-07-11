import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { ingredientsActions } from "./features/ingredients-slice";
import { uiActions } from "./features/ui-slice";
import { Ingredient } from "@/types";

export function fetchIngredients() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data, error } = await supabase.from("ingredients").select("*");

      if (error) {
        throw new Error(`Error fetching ingredients: ${error.message}`);
      }
      dispatch(ingredientsActions.setItems({ ingredients: data }));
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addIngredient(ingredient: Ingredient) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase.from("ingredients").insert([ingredient]);
      if (error) {
        throw new Error(`Error adding ingredient: ${error.message}`);
      }
      dispatch(ingredientsActions.addItem(ingredient));
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };
}

export function updateIngredient(id: string, ingredient: Ingredient) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { error } = await supabase
        .from("ingredients")
        .update(ingredient)
        .eq("id", id);

      if (error) {
        throw new Error(`Error updating ingredient: ${error.message}`);
      }
      dispatch(ingredientsActions.updateItem({ id, ingredient }));
    } catch (error) {
      console.error("Error updating ingredient:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function deleteIngredient(id: string) {
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
