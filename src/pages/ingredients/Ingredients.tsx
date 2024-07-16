import { useAppSelector } from "@/store/hooks";
import NewIngredient from "@/components/ingredients/new-ingredient";
import { IngredientItem } from "@/components/ingredients/ingredient-item";

import { Ingredient } from "@/types";

function IngredientsPage() {
  const ingredients = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );

  const availableIngredients = ingredients.filter((item) => item.available);
  const unavailableIngredients = ingredients.filter((item) => !item.available);

  return (
    <div className="flex flex-col h-screen">
      <ul className="flex-1 px-2">
        {unavailableIngredients.map((item) => (
          <IngredientItem key={item.id} ingredient={item} />
        ))}
        {availableIngredients.map((item) => (
          <IngredientItem key={item.id} ingredient={item} />
        ))}
      </ul>
      <div className="sticky bottom-0 p-2">
        <NewIngredient />
      </div>
    </div>
  );
}

export default IngredientsPage;
