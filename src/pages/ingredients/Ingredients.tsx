import { useAppSelector } from "@/store/hooks";

import NewIngredient from "@/components/ingredients/new-ingredient";
import { IngredientItem } from "@/components/ingredients/ingredient-item";

import { Composition, Ingredient, Schedule } from "@/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

function IngredientsPage() {
  const ingredients = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );

  const schedule = useAppSelector<Schedule[]>(
    (state) => state.schedule.schedule
  );
  const compositionsData = useAppSelector<Composition[]>(
    (state) => state.compositions.compositions
  );

  const mealIdsInSchedule = schedule.map((item) => {
    return item.meal_id;
  });

  const filteredCompositions = compositionsData.filter(
    (item) => !mealIdsInSchedule.includes(item.meal_id)
  );

  const ingredientIdsInSchedule = filteredCompositions.map((item) => {
    return item.ingredient_id;
  });

  const filteredIngredients = ingredients.filter((item) =>
    ingredientIdsInSchedule.includes(item.id)
  );

  const needToPurchace = filteredIngredients.filter((item) => !item.available);

  const noNeedToPurchace = ingredients
    .filter((item) => !ingredientIdsInSchedule.includes(item.id))
    .filter((item) => !item.available);

  const availableIngredients = ingredients.filter((item) => item.available);

  return (
    <div className="flex flex-col h-screen">
      <ul className="flex-1 px-2 space-y-2">
        <Card>
          <CardHeader className="text-red-600 font-bold">
            Need to purchase for the weekly schedule
          </CardHeader>
          <CardContent>
            {needToPurchace.map((item) => (
              <IngredientItem key={item.id} ingredient={item} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>No need to purchase</CardHeader>
          <CardContent>
            {noNeedToPurchace.map((item) => (
              <IngredientItem key={item.id} ingredient={item} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Available Ingredients</CardHeader>
          <CardContent>
            {availableIngredients.map((item) => (
              <IngredientItem key={item.id} ingredient={item} />
            ))}
          </CardContent>
        </Card>
      </ul>
      <div className="sticky bottom-0 p-2">
        <NewIngredient />
      </div>
    </div>
  );
}

export default IngredientsPage;
