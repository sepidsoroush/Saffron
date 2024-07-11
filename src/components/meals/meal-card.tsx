import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IngredientItem } from "../ingredients/ingredient-item";
import { Meal } from "@/types";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  return (
    <Card className="m-2">
      <CardTitle className="text-lg px-4 py-2">{meal.name}</CardTitle>
      <CardContent>
        <ul>
          {meal.ingredients?.map((item) => (
            <li key={item.id}>
              <IngredientItem ingredient={item} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
