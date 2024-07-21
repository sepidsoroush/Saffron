import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { MealCard } from "@/components/meals/meal-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Meal } from "@/types";

function MealsPage() {
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);

  return (
    <div className="flex flex-col h-screen">
      <ul className="flex-1 px-2">
        {meals.map((item) => (
          <MealCard key={item.id} meal={item} />
        ))}
      </ul>
      <div className="sticky bottom-0 px-2 w-full">
        <div className="h-3 w-full bg-gradient-to-t from-gray-100 to-transparent"></div>
        <Button className="gap-1 w-full">
          <Link
            to="/meals/new"
            className="gap-1 w-full flex flex-row justify-center items-center"
          >
            <Plus size={18} />
            <span className="text-base font-light">New Meal</span>
          </Link>
        </Button>
        <div className="h-2 w-full bg-white"></div>
      </div>
    </div>
  );
}

export default MealsPage;
