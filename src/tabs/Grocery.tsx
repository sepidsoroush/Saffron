import { useEffect } from "react";
import { Ingredient } from "../types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchIngredients } from "@/store/ingredients-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function GroceryTab() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );
  const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex items-center place-content-center">
          <LoadingSpinner
            width={48}
            height={48}
            className="flex items-center place-content-center"
          />
        </div>
      ) : (
        <ul>
          {ingredients.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default GroceryTab;
