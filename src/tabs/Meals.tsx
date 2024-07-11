import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeals } from "@/store/meals-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Meal } from "../types";

function MealsTab() {
  const dispatch = useAppDispatch();
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);
  const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  useEffect(() => {
    dispatch(fetchMeals());
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
          {meals.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MealsTab;
