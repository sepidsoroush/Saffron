import { Dispatch } from "redux";
import supabase from "@/config/supabaseConfig";
import { mealsActions } from "./features/meals-slice";
import { uiActions } from "./features/ui-slice";
import { Meal } from "@/types";

export function setDataAction() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));

    try {
      const { data: foods, error } = await supabase.from("foods").select("*");

      if (error) {
        console.error("Error fetching meals:", error);
      } else {
        const loadedData: Meal[] = foods.map((food: Meal) => ({
          id: food.id,
          name: food.name,
          ingredients: food.ingredients,
          lastCooked: food.lastCooked,
          type: food.type,
        }));

        dispatch(mealsActions.setItems({ meals: loadedData }));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function deleteAction(mealID: string) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));

    try {
      const { error } = await supabase.from("foods").delete().eq("id", mealID);

      if (error) {
        console.error("Error deleting meal:", error);
      } else {
        dispatch(mealsActions.deleteItem(mealID));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addAction(meal: Meal) {
  return async (dispatch: Dispatch) => {
    try {
      const { error } = await supabase.from("foods").insert([meal]).select();

      if (error) {
        console.error("Error adding meal:", error);
      } else {
        dispatch(mealsActions.addItem(meal));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
}

export function updateAction(id: string, meal: Meal) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));

    try {
      const { error } = await supabase
        .from("foods")
        .update(meal)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating meal:", error);
      } else {
        dispatch(mealsActions.updateItem({ id, meal }));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
