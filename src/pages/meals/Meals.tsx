import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMeals } from "@/store/meals/meals.selector";
import { selectLoading } from "@/store/ui/ui.selector";
import { MealCard } from "@/components/meals/meal-card";
import { MealCardSkeleton } from "@/components/skeleton/meal-card-skeleton";
import { Header } from "@/components/layout/header";
import { NewItemButton } from "@/components/shared/new-item-button";
import EmptyStateMeals from "@/components/emptyState/meals-empty-state";
import { Meal } from "@/types";
import { groupMealsByCuisine } from "@/lib/utils";
import { More1Line } from "@/components/shared/icons";

function SkeletonList({ count }: { count: number }) {
  return (
    <ul className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }, (_, index) => (
        <MealCardSkeleton key={index} />
      ))}
    </ul>
  );
}

function MealsListByCuisine({
  groupedMeals,
}: {
  groupedMeals: Record<string, Meal[]>;
}) {
  return (
    <div className="space-y-4 mt-4">
      {Object.entries(groupedMeals).map(([cuisine, meals]) => (
        <div key={cuisine}>
          <h2 className="text-xl font-bold">{cuisine}</h2>
          <ul className="py-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-hidden">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MealsPage() {
  const navigate = useNavigate();
  const mealsData = useAppSelector(selectMeals);
  const isLoading = useAppSelector(selectLoading);

  const handleNewItemClick = () => {
    navigate("/meals/new");
  };

  const groupedMeals = groupMealsByCuisine(mealsData);

  const isEmptyStateVisible = !isLoading && mealsData.length === 0;

  return (
    <div className="flex flex-col overflow-y-auto">
      <Header
        actionComponent={
          <div className="flex flex-row space-x-6">
            <NewItemButton onClick={handleNewItemClick} />
            <div className="text-zinc-500">
              <More1Line width={30} height={30} />
            </div>
          </div>
        }
      >
        Meals
      </Header>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isEmptyStateVisible ? (
        <EmptyStateMeals />
      ) : (
        <MealsListByCuisine groupedMeals={groupedMeals} />
      )}
    </div>
  );
}

export default MealsPage;
