import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { selectMeals } from "@/store/meals/meals.selector";
import { selectLoading } from "@/store/ui/ui.selector";

import { MealCard } from "@/components/meals/meal-card";
import { MealCardSkeleton } from "@/components/skeleton/meal-card-skeleton";
import { Header } from "@/components/layout/header";

function MealsPage() {
  const navigate = useNavigate();

  const mealsData = useAppSelector(selectMeals);
  const isLoading = useAppSelector(selectLoading);

  const newItemHandler = () => {
    navigate("/meals/new");
  };

  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <MealCardSkeleton key={index} />
    ));
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <Header onClick={newItemHandler} actionTitle="New Meal">
        Meals List
      </Header>
      <ul className="px-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {isLoading
          ? renderSkeletons(3)
          : mealsData.map((item) => <MealCard key={item.id} meal={item} />)}
      </ul>
    </div>
  );
}

export default MealsPage;
