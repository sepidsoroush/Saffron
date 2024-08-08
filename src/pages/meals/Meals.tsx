import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMeals } from "@/store/meals/meals.selector";
import { selectLoading } from "@/store/ui/ui.selector";
import { MealCard } from "@/components/meals/meal-card";
import { MealCardSkeleton } from "@/components/skeleton/meal-card-skeleton";
import { Header } from "@/components/layout/header";
import NewItemButton from "@/components/shared/new-item-button";
import EmptyStateMeals from "@/components/emptyState/meals-empty-state";
import { Meal } from "@/types";

function SkeletonList({ count }: { count: number }) {
  return (
    <ul className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }, (_, index) => (
        <MealCardSkeleton key={index} />
      ))}
    </ul>
  );
}

function MealsList({ meals }: { meals: Array<Meal> }) {
  return (
    <ul className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-hidden">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

function MealsPage() {
  const navigate = useNavigate();
  const mealsData = useAppSelector(selectMeals);
  const isLoading = useAppSelector(selectLoading);

  const handleNewItemClick = () => {
    navigate("/meals/new");
  };

  return (
    <div className="flex flex-col overflow-y-auto my-[72px]">
      <Header onClick={handleNewItemClick} actionTitle="New Meal">
        Meals List
      </Header>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : mealsData.length === 0 ? (
        <EmptyStateMeals />
      ) : (
        <MealsList meals={mealsData} />
      )}

      <div className="md:hidden inline-block bottom-20 right-5 fixed">
        <NewItemButton onClick={handleNewItemClick} />
      </div>
    </div>
  );
}

export default MealsPage;
