import IngredientForm from "./ingredient-form";
import { Ingredient } from "@/types";

type Props = {
  item: Ingredient;
};

export const IngredientItem = ({ item }: Props) => {
  return <IngredientForm type="update" ingredient={item} />;
};
