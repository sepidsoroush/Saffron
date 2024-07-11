import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDataAction } from "@/store/meals-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Meal } from "../types";

function MealsTab() {
  const dispatch = useAppDispatch();
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);
  const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  useEffect(() => {
    dispatch(setDataAction());
  }, [dispatch]);

  return (
    <>
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
            {meals.map((food) => (
              <li key={food.id}>{food.name}</li>
            ))}
          </ul>
        )}
      </>
    </>
  );
}

export default MealsTab;
