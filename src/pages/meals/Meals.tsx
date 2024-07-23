import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { MealCard } from "@/components/meals/meal-card";

import { Meal } from "@/types";
import { Header } from "@/components/layout/header";

function MealsPage() {
  const navigate = useNavigate();

  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);

  const newItemHandler = () => {
    navigate("/meals/new");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onClick={newItemHandler} actionTitle="New Meal">
        Meals List
      </Header>
      <ul className="px-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-[64px] md:mb-0">
        {meals.map((item) => (
          <MealCard key={item.id} meal={item} />
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
