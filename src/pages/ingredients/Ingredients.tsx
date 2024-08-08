import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  selectEssentialItems,
  selectNeedToPurchase,
  selectAvailableIngredients,
  selectEssentialItemsLength,
  selectIngredientsLength,
} from "@/store/ingredients/ingredients.selector";
import { selectLoading } from "@/store/ui/ui.selector";

import { Header } from "@/components/layout/header";
import NewIngredient from "@/components/ingredients/new-ingredient";
import { CategoryCard } from "@/components/shared/category-card";
import NewItemButton from "@/components/shared/new-item-button";
import { IngredientSkeleton } from "@/components/skeleton/ingredient-skeleton";
import EmptyStateIngredients from "@/components/emptyState/ingredients-empty-state";
import { Ingredient } from "@/types";

function SkeletonList({ count }: { count: number }) {
  return (
    <div className="px-2 flex flex-col overflow-hidden">
      {Array.from({ length: count }, (_, index) => (
        <IngredientSkeleton key={index} />
      ))}
    </div>
  );
}

function Category({
  header,
  items,
  className,
}: {
  header: string;
  items: Ingredient[];
  className: string;
}) {
  return items.length > 0 ? (
    <CategoryCard header={header} items={items} className={className} />
  ) : null;
}

function IngredientsPage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const essentialItems = useAppSelector(selectEssentialItems);
  const needToPurchase = useAppSelector(selectNeedToPurchase);
  const availableIngredients = useAppSelector(selectAvailableIngredients);
  const essentialItemsLength = useAppSelector(selectEssentialItemsLength);
  const numberOfIngredients = useAppSelector(selectIngredientsLength);
  const isLoading = useAppSelector(selectLoading);

  const handleNewItemClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsCreating(true);
  };

  return (
    <div className="flex flex-col justify-between overflow-y-auto my-[72px]">
      <Header onClick={handleNewItemClick} actionTitle="New Item">
        Grocery List
      </Header>

      {isCreating && <NewIngredient setIsCreating={setIsCreating} />}

      {isLoading ? (
        <SkeletonList count={6} />
      ) : numberOfIngredients === 0 && !isCreating ? (
        <EmptyStateIngredients />
      ) : (
        <div className="flex-1 p-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0">
          <Category
            header={`Essential items for schedule (${essentialItemsLength})`}
            items={essentialItems}
            className="text-red-600 font-bold py-4"
          />
          <Category
            header="Need to purchase"
            items={needToPurchase}
            className="font-semibold py-4"
          />
          <Category
            header="Available Ingredients"
            items={availableIngredients}
            className="py-4"
          />
        </div>
      )}

      <div className="md:hidden inline-block bottom-20 right-5 fixed">
        <NewItemButton onClick={handleNewItemClick} />
      </div>
    </div>
  );
}

export default IngredientsPage;
