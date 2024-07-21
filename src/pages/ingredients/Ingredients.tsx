import { useMemo } from "react";

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

  const mealIdsInSchedule = useMemo(
    () => schedule.map((item) => Number(item.meal_id)).filter(Boolean),
    [schedule]
  );

  const filteredCompositions = useMemo(
    () =>
      compositionsData.filter((item) =>
        mealIdsInSchedule.includes(item.meal_id)
      ),
    [compositionsData, mealIdsInSchedule]
  );

  const ingredientIdsInSchedule = useMemo(
    () => filteredCompositions.map((item) => item.ingredient_id),
    [filteredCompositions]
  );

  const needToPurchase = useMemo(
    () =>
      ingredients
        .filter((item) => ingredientIdsInSchedule.includes(item.id))
        .filter((item) => !item.available),
    [ingredients, ingredientIdsInSchedule]
  );

  const noNeedToPurchase = useMemo(
    () =>
      ingredients
        .filter((item) => !ingredientIdsInSchedule.includes(item.id))
        .filter((item) => !item.available),
    [ingredients, ingredientIdsInSchedule]
  );

  const availableIngredients = useMemo(
    () => ingredients.filter((item) => item.available),
    [ingredients]
  );

  return (
    <div className="flex flex-col h-screen">
      <ul className="flex-1 px-2 space-y-2">
        <IngredientCategoryCard
          header="Need to purchase for schedule"
          ingredients={needToPurchase}
          className="text-red-600 font-bold"
        />
        <IngredientCategoryCard
          header="No need to purchase"
          ingredients={noNeedToPurchase}
        />
        <IngredientCategoryCard
          header="Available Ingredients"
          ingredients={availableIngredients}
        />
      </ul>
      <div className="sticky bottom-0 px-2">
        <div className="h-3 w-full bg-gradient-to-t from-gray-100 to-transparent"></div>
        <NewIngredient />
        <div className="h-2 w-full bg-white"></div>
      </div>
    </div>
  );
}

export default IngredientsPage;

interface CardProps {
  header: string;
  ingredients: Ingredient[];
  className?: string;
}

const IngredientCategoryCard: React.FC<CardProps> = ({
  header,
  ingredients,
  className,
}) => (
  <Card>
    <CardHeader className={className}>{header}</CardHeader>
    <CardContent>
      {ingredients.map((ingredient) => (
        <IngredientItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </CardContent>
  </Card>
);
