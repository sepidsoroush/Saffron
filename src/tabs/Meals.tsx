import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeals } from "@/store/meals-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MealCard } from "@/components/meals/meal-card";
import NewMeal from "@/components/meals/new-meal";
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
    <div className="px-2">
      <NewMeal />
      <ul className="grid grid-cols-2 gap-2 overflow-auto">
        {meals.map((item) => (
          <MealCard key={item.id} meal={item} />
        ))}
      </ul>
    </div>
  );
}

export default MealsTab;
