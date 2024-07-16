import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { MealCard } from "@/components/meals/meal-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Meal } from "@/types";

function MealsTab() {
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);

  return (
    <div className="flex flex-col h-screen">
      <ul className="flex-1 px-2 grid grid-cols-2">
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
