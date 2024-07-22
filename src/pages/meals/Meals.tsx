// import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { MealCard } from "@/components/meals/meal-card";
// import NewItem from "@/components/shared/new-Item";

import { Meal } from "@/types";

function MealsPage() {
  // const navigate = useNavigate();

  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);

  // const newItemHandler = () => {
  //   navigate("/meals/new");
  // };

  return (
    <div className="flex flex-col h-screen flex-1">
      <ul className=" px-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {meals.map((item) => (
          <MealCard key={item.id} meal={item} />
        ))}
      </ul>
      {/* <NewItem onClick={newItemHandler} title="New Meal" /> */}
    </div>
  );
}

export default MealsPage;
