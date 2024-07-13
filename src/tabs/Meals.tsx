import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeals } from "@/store/meals-actions";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MealCard } from "@/components/meals/meal-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Meal } from "../types";

function MealsTab() {
  const dispatch = useAppDispatch();
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);
  // const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-screen flex items-center place-content-center">
  //       <LoadingSpinner
  //         width={48}
  //         height={48}
  //         className="flex items-center place-content-center"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col h-screen">
      <ul className="flex-1 px-2">
        {meals.map((item) => (
          <MealCard key={item.id} meal={item} />
        ))}
      </ul>
      <Button className="sticky bottom-0 p-2">
        <Link
          to="/new-meal"
          className="gap-1 w-full flex flex-row justify-center items-center"
        >
          <Plus size={18} />
          <span className="text-base font-light">New Meal</span>
        </Link>
      </Button>
    </div>
  );
}

export default MealsTab;
