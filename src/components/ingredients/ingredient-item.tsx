import IngredientForm from "./ingredient-form";
import { Ingredient, Grocery } from "@/types";

type Props = {
  item: Ingredient | Grocery;
};

export const IngredientItem = ({ item }: Props) => {
  return <IngredientForm type="update" ingredient={item} />;
};
