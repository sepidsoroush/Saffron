import { useAppSelector } from "@/store/hooks";
import { selectMeals } from "@/store/meals/meals.selector";
import { selectLoading } from "@/store/ui/ui.selector";
import { MealCard } from "@/components/meals/meal-card";
import { MealCardSkeleton } from "@/components/skeleton/meal-card-skeleton";
import { Header } from "@/components/layout/header";
import NewMealDrawer from "@/components/meals/new-meal-drawer";
import EmptyStateMeals from "@/components/emptyState/meals-empty-state";
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

function MealsPage() {
  const mealsData = useAppSelector(selectMeals);
  const isLoading = useAppSelector(selectLoading);

  const isEmptyStateVisible = !isLoading && mealsData.length === 0;

  return (
    <div className="flex flex-col overflow-y-auto -mx-[22px] mt-[72px]">
      <Header
        actionComponent={
          <div className="flex flex-row space-x-6">
            <NewMealDrawer />
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
        <ul className="pt-2 pb-8 px-[22px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
          {mealsData.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealsPage;
