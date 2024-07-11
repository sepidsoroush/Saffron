import { useEffect } from "react";
import { Ingredient } from "../types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchIngredients } from "@/store/ingredients-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { IngredientItem } from "@/components/ingredients/ingredient-item";
import { CardDescription } from "@/components/ui/card";

function GroceryTab() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );
  const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center place-content-center">
        <LoadingSpinner
          width={48}
          height={48}
          className="flex items-center place-content-center"
        />
      </div>
    );
  }

  // Separate ingredients based on 'available' property
  const availableIngredients = ingredients.filter((item) => item.available);
  const unavailableIngredients = ingredients.filter((item) => !item.available);

  return (
    <ul className="flex flex-col gap-2 m-2">
      <CardDescription>Grocery list</CardDescription>
      {unavailableIngredients.map((item) => (
        <IngredientItem key={item.id} ingredient={item} />
      ))}
      {availableIngredients.map((item) => (
        <IngredientItem key={item.id} ingredient={item} />
      ))}
    </ul>
  );
}

export default GroceryTab;
