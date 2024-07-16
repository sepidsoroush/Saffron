import { Link } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import IngredientListItem from "../ingredients/ingredient-list-item";
import { Meal, Composition, Ingredient } from "@/types";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  const compositions = useAppSelector<Composition[]>(
    (state) => state.compositions.compositions
  );
  const ingredients = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );

  const ingredientsInRecipe = compositions.filter(
    (item) => item.meal_id === meal.id
  );

  const findIngredientById = (
    ingredient_id: number
  ): Ingredient | undefined => {
    return ingredients.find((item) => item.id === ingredient_id);
  };

  return (
    <Link to={`/meals/${meal.id}`}>
      <Card className="m-2">
        <CardTitle className="text-lg px-4 py-2">{meal.name}</CardTitle>
        <CardContent className="px-4 py-0">
          <ul>
            {ingredientsInRecipe?.map((item) => (
              <IngredientListItem
                key={item.id}
                ingredient={findIngredientById(item.ingredient_id)}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
};
