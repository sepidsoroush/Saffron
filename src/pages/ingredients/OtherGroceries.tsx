import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import {
  selectNeedToPurchaseGroceries,
  selectAvailableGroceries,
  selectNumberOfGroceries,
} from "@/store/groceries/groceries.selector";

import { Card } from "@/components/ui/card";

import NewIngredient from "@/components/ingredients/new-ingredient";
import { CategoryCard } from "@/components/shared/category-card";
import { Header } from "@/components/layout/header";

function OtherGroceriesPage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const unavailableGroceries = useAppSelector(selectNeedToPurchaseGroceries);
  const availableGroceries = useAppSelector(selectAvailableGroceries);
  const numberOfGroceries = useAppSelector(selectNumberOfGroceries);

  const newItemHandler = () => {
    setIsCreating(true);
  };

  return (
    <div className="flex flex-col justify-between overflow-y-auto">
      <Header onClick={newItemHandler} actionTitle="New grocery">
        Other Groceries
      </Header>
      {isCreating ? (
        <NewIngredient setIsCreating={setIsCreating} category="grocery" />
      ) : null}
      <div className="flex-1 p-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0">
        {unavailableGroceries.length !== 0 ? (
          <CategoryCard
            header="Need to purchase"
            items={unavailableGroceries}
            className="font-semibold py-4"
            category="grocery"
          />
        ) : null}
        {availableGroceries.length !== 0 ? (
          <CategoryCard
            header="Available Groceries"
            items={availableGroceries}
            className="py-4"
            category="grocery"
          />
        ) : null}
        {numberOfGroceries === 0 && !isCreating ? (
          <Card className="border border-red-200 text-red-700 p-4">
            Add other types of groceries you usually have in your shopping cart,
            even if they're not recipe ingredients. This includes household
            items, personal care products, and drinks.
          </Card>
        ) : null}
      </div>
    </div>
  );
}

export default OtherGroceriesPage;
