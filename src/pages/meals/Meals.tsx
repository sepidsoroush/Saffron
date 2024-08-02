import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMeals } from "@/store/meals/meals.selector";
import { selectLoading } from "@/store/ui/ui.selector";

import { MealCard } from "@/components/meals/meal-card";
import { MealCardSkeleton } from "@/components/skeleton/meal-card-skeleton";
import { Header } from "@/components/layout/header";
import NewItemButton from "@/components/shared/new-item-button";
import EmptyStateMeals from "@/components/emptyState/meals-empty-state";

function MealsPage() {
  const navigate = useNavigate();

  const mealsData = useAppSelector(selectMeals);
  const isLoading = useAppSelector(selectLoading);

  const newItemHandler = () => {
    navigate("/meals/new");
  };

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }, (_, index) => (
      <MealCardSkeleton key={index} />
    ));

  return (
    <div className="flex flex-col overflow-y-auto my-[72px]">
      <Header onClick={newItemHandler} actionTitle="New Meal">
        Meals List
      </Header>

      {isLoading ? (
        <ul className="px-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {renderSkeletons(3)}
        </ul>
      ) : mealsData.length === 0 ? (
        <EmptyStateMeals />
      ) : (
        <ul className="px-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {mealsData.map((item) => (
            <MealCard key={item.id} meal={item} />
          ))}
        </ul>
      )}

      <div className="md:hidden inline-block bottom-20 right-5 fixed">
        <NewItemButton onClick={newItemHandler} />
      </div>
    </div>
  );
}

export default MealsPage;
