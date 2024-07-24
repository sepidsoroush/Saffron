import IngredientForm from "./ingredient-form";
import { Ingredient, Grocery } from "@/types";

type Props = {
  item: Ingredient | Grocery;
  category: "ingredient" | "grocery";
};

export const IngredientItem = ({ item, category }: Props) => {
  return <IngredientForm type="update" ingredient={item} category={category} />;
};
