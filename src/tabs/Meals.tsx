import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeals } from "@/store/meals-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MealCard } from "@/components/meal-card";
import { Meal } from "../types";

function MealsTab() {
  const dispatch = useAppDispatch();
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);
  const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  useEffect(() => {
    dispatch(fetchMeals());
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

  return (
    <ul className="grid grid-cols-2 gap-2">
      {meals.map((item) => (
        <MealCard key={item.id} meal={item} />
      ))}
    </ul>
  );
}

export default MealsTab;
