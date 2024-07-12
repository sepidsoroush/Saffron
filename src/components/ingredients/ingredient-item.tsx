import IngredientForm from "./ingredient-form";
import { Ingredient } from "@/types";

type Props = {
  ingredient: Ingredient;
};

export const IngredientItem = ({ ingredient }: Props) => {
  return <IngredientForm type="update" ingredient={ingredient} />;
};
