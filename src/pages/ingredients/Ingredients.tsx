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

import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import NewIngredient from "@/components/ingredients/new-ingredient";
import { CategoryCard } from "@/components/shared/category-card";
import NewItemButton from "@/components/shared/new-item-button";
import { IngredientSkeleton } from "@/components/skeleton/ingredient-skeleton";
import EmptyStateIngredients from "@/components/emptyState/ingredients-empty-state";

function IngredientsPage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const essentialItems = useAppSelector(selectEssentialItems);
  const needToPurchase = useAppSelector(selectNeedToPurchase);
  const availableIngredients = useAppSelector(selectAvailableIngredients);
  const essentialItemsLength = useAppSelector(selectEssentialItemsLength);
  const numberOfIngredients = useAppSelector(selectIngredientsLength);

  const isLoading = useAppSelector(selectLoading);

  const newItemHandler = () => {
    setIsCreating(true);
  };

  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <IngredientSkeleton key={index} />
    ));
  };

  return (
    <div className="flex flex-col justify-between overflow-y-auto my-[72px]">
      <Header onClick={newItemHandler} actionTitle="New Item">
        Grocery List
      </Header>
      {isCreating ? <NewIngredient setIsCreating={setIsCreating} /> : null}
      {numberOfIngredients === 0 && !isCreating ? (
        <EmptyStateIngredients />
      ) : // <Card className="border border-amber-200 text-amber-700 p-4 m-2">
      //   No item in the grocery shopping list. Start adding ingredients by
      //   clicking on + button.
      // </Card>
      null}

      {isLoading ? (
        <div className="px-2 flex flex-col">{renderSkeletons(6)}</div>
      ) : (
        <div className="flex-1 p-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0">
          {essentialItemsLength !== 0 ? (
            <CategoryCard
              header={`Essential items for schedule (${essentialItemsLength})`}
              items={essentialItems}
              className="text-red-600 font-bold py-4"
            />
          ) : null}
          {needToPurchase.length !== 0 ? (
            <CategoryCard
              header="Need to purchase"
              items={needToPurchase}
              className="font-semibold py-4"
            />
          ) : null}

          {availableIngredients.length !== 0 ? (
            <CategoryCard
              header="Available Ingredients"
              items={availableIngredients}
              className="py-4"
            />
          ) : null}
        </div>
      )}

      <div className="md:hidden inline-block bottom-20 right-5 fixed">
        <NewItemButton onClick={newItemHandler} />
      </div>
    </div>
  );
}

export default IngredientsPage;
