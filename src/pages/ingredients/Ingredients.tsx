import { useMemo, useState } from "react";

import { useAppSelector } from "@/store/hooks";

import { IngredientItem } from "@/components/ingredients/ingredient-item";
import { Header } from "@/components/layout/header";

import { Composition, Ingredient, Schedule } from "@/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import NewIngredient from "@/components/ingredients/new-ingredient";

function IngredientsPage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

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

  const essentialItems = useMemo(
    () =>
      ingredients
        .filter((item) => ingredientIdsInSchedule.includes(item.id))
        .filter((item) => !item.available),
    [ingredients, ingredientIdsInSchedule]
  );

  const needToPurchase = useMemo(
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

  const newItemHandler = () => {
    setIsCreating(true);
  };

  return (
    <div className="flex flex-col justify-between">
      <Header onClick={newItemHandler} actionTitle="New Item">
        Grocery List
      </Header>
      {isCreating ? <NewIngredient setIsCreating={setIsCreating} /> : null}
      <ul className="flex-1 p-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0 mb-[64px] md:mb-0">
        <IngredientCategoryCard
          header="Essential items for schedule"
          ingredients={essentialItems}
          className="text-red-600 font-bold py-4"
        />
        <IngredientCategoryCard
          header="Need to purchase"
          ingredients={needToPurchase}
          className="font-semibold py-4"
        />
        <IngredientCategoryCard
          header="Available Ingredients"
          ingredients={availableIngredients}
          className="py-4"
        />
      </ul>
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
