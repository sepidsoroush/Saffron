import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  selectIngredientsLength,
  selectIngredients,
} from "@/store/ingredients/ingredients.selector";
import { selectLoading } from "@/store/ui/ui.selector";

import { Header } from "@/components/layout/header";
import NewIngredient from "@/components/ingredients/new-ingredient";
import { CategoryCard } from "@/components/shared/category-card";
import NewItemButton from "@/components/shared/new-item-button";
import { IngredientSkeleton } from "@/components/skeleton/ingredient-skeleton";
import EmptyStateIngredients from "@/components/emptyState/ingredients-empty-state";
import NewItem from "@/components/shared/new-Item";
import { CategoryType } from "@/types/constants";

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

  const allIngredients = useAppSelector(selectIngredients);
  const numberOfIngredients = useAppSelector(selectIngredientsLength);
  const isLoading = useAppSelector(selectLoading);

  const getIngredientsByCategory = (category: string) =>
    allIngredients.filter((ingredient) => ingredient.category === category);

  const handleNewItemClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsCreating(true);
  };

  const isEmptyStateVisible = !isLoading && numberOfIngredients === 0;

  return (
    <div className="flex flex-col justify-between overflow-y-auto">
      <Header
        actionComponent={
          <NewItem title="Add New" onClick={handleNewItemClick} />
        }
      >
        Grocery List
      </Header>

      {isCreating && <NewIngredient setIsCreating={setIsCreating} />}

      {isLoading ? (
        <SkeletonList count={6} />
      ) : isEmptyStateVisible && !isCreating ? (
        <EmptyStateIngredients />
      ) : (
        <div className="flex-1 py-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0">
          {Object.values(CategoryType).map((category) => {
            const categoryItems = getIngredientsByCategory(category);
            const numberOfIngredientsInCategory = categoryItems.length;

            return numberOfIngredientsInCategory !== 0 ? (
              <CategoryCard
                key={category}
                header={category}
                items={categoryItems}
                className="py-4"
              />
            ) : null;
          })}
        </div>
      )}

      <div className="md:hidden inline-block bottom-20 right-5 fixed">
        <NewItemButton onClick={handleNewItemClick} />
      </div>
    </div>
  );
}

export default IngredientsPage;
