import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { selectMeals } from "@/store/meals/meals.selector";

import { MealCard } from "@/components/meals/meal-card";
import { Header } from "@/components/layout/header";

function MealsPage() {
  const navigate = useNavigate();

  const mealsData = useAppSelector(selectMeals);

  const newItemHandler = () => {
    navigate("/meals/new");
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <Header onClick={newItemHandler} actionTitle="New Meal">
        Meals List
      </Header>
      <ul className="px-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {mealsData.map((item) => (
          <MealCard key={item.id} meal={item} />
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
