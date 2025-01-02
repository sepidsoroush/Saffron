import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  selectIngredientsLength,
  selectIngredients,
} from "@/store/ingredients/ingredients.selector";
import { selectLoading } from "@/store/ui/ui.selector";

import IngredientForm from "@/components/ingredients/ingredient-form";
import { IngredientItem } from "@/components/ingredients/ingredient-item";
import { IngredientSkeleton } from "@/components/skeleton/ingredient-skeleton";
import { NewItemButton } from "@/components/shared/new-item-button";
import EmptyStateIngredients from "@/components/emptyState/ingredients-empty-state";
import { EyeCloseLine, Eye2Line } from "@/components/shared/icons";
import { Ingredient } from "@/types";
import { CategoryType } from "@/types/constants";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

function SkeletonList({ count }: { count: number }) {
  return (
    <div className="px-2 flex flex-col overflow-hidden">
      {Array.from({ length: count }, (_, index) => (
        <IngredientSkeleton key={index} />
      ))}
    </div>
  );
}

function IngredientsPage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const allIngredients = useAppSelector(selectIngredients);
  const numberOfIngredients = useAppSelector(selectIngredientsLength);
  const isLoading = useAppSelector(selectLoading);

  const getIngredientsByCategory = (category: string) =>
    allIngredients.filter((ingredient) => ingredient.category === category);

  const handleNewItemClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsCreating(true);
  };

  const handleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const finishCreatingHandler = () => {
    setIsCreating(false);
  };

  const isEmptyStateVisible = !isLoading && numberOfIngredients === 0;

  return (
    <div className="flex flex-col">
      <Header
        actionComponent={
          <div className="flex flex-row space-x-6">
            <NewItemButton onClick={handleNewItemClick} />
            <div className="text-zinc-500" onClick={handleShowCompleted}>
              {showCompleted ? (
                <Eye2Line width={30} height={30} />
              ) : (
                <EyeCloseLine width={30} height={30} />
              )}
            </div>
          </div>
        }
      >
        Shopping list
      </Header>

      {isCreating && (
        <IngredientForm type="create" onFinish={finishCreatingHandler} />
      )}

      {isLoading ? (
        <SkeletonList count={6} />
      ) : isEmptyStateVisible && !isCreating ? (
        <EmptyStateIngredients />
      ) : (
        <div className="py-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0">
          {Object.values(CategoryType).map((category) => {
            const categoryItems = getIngredientsByCategory(category);
            const numberOfIngredientsInCategory = categoryItems.length;

            return numberOfIngredientsInCategory !== 0 ? (
              <CategoryCard
                key={category}
                header={category}
                items={
                  showCompleted
                    ? categoryItems
                    : categoryItems.filter((item) => !item.available)
                }
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default IngredientsPage;

interface CategoryCardProps {
  header: string;
  items: Ingredient[];
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  header,
  items,
  className,
}) => {
  return (
    <div
      className={
        items.length > 0
          ? "flex flex-col justify-start items-start w-full"
          : "hidden"
      }
    >
      <div
        className={cn(
          "text-xs font-medium text-neutral-400 py-1 mb-1 md:text-lg",
          className
        )}
      >
        {header}
      </div>

      <div className="space-y-[3px]">
        {items
          .sort((a, b) => Number(a.available) - Number(b.available))
          .map((item) => (
            <IngredientItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};
