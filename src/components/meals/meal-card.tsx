import { Link } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { selectCompositionsByMealId } from "@/store/compositions/compositions.selector";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import IngredientListItem from "@/components/ingredients/ingredient-list-item";

import { Meal } from "@/types";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  const ingredientsInRecipe = useAppSelector((state) =>
    selectCompositionsByMealId(state, meal.id)
  );

  return (
    <Link to={`/meals/${meal.id}`}>
      <Card className="my-2 overflow-x-hidden">
        <CardTitle className="text-lg px-4 py-2">{meal.name}</CardTitle>
        <CardContent className="px-4 py-0">
          <ScrollArea className="md:h-56 pb-4">
            <ul className="pb-2">
              {ingredientsInRecipe.map((comp) => (
                <IngredientListItem
                  key={comp.id}
                  ingredient={comp.ingredient}
                />
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </Link>
  );
};
