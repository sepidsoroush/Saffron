import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";

import {
  selectEssentialItems,
  selectNeedToPurchase,
  selectAvailableIngredients,
  selectEssentialItemsLength,
} from "@/store/ingredients/ingredients.selector";

import { Card, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import NewIngredient from "@/components/ingredients/new-ingredient";
import { CategoryCard } from "@/components/shared/category-card";

import { ChevronRight } from "lucide-react";

function IngredientsPage() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const essentialItems = useAppSelector(selectEssentialItems);
  const needToPurchase = useAppSelector(selectNeedToPurchase);
  const availableIngredients = useAppSelector(selectAvailableIngredients);
  const essentialItemsLength = useAppSelector(selectEssentialItemsLength);

  const newItemHandler = () => {
    setIsCreating(true);
  };

  return (
    <div className="flex flex-col justify-between">
      <Header onClick={newItemHandler} actionTitle="New Item">
        Grocery List
      </Header>
      {isCreating ? (
        <NewIngredient setIsCreating={setIsCreating} category="ingredient" />
      ) : null}
      <div className="flex-1 p-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0 mb-[64px] md:mb-0">
        {essentialItemsLength !== 0 ? (
          <CategoryCard
            header="Essential items for schedule"
            items={essentialItems}
            className="text-red-600 font-bold py-4"
            category="ingredient"
          />
        ) : null}

        <CategoryCard
          header="Need to purchase"
          items={needToPurchase}
          className="font-semibold py-4"
          category="ingredient"
        />
        <CategoryCard
          header="Available Ingredients"
          items={availableIngredients}
          className="py-4"
          category="ingredient"
        />
        <Card>
          <CardHeader className="py-4">
            <button
              className="flex flex-row justify-between items-center"
              onClick={() => {
                navigate("/ingredients/others");
              }}
            >
              <span>Other groceries</span>
              <ChevronRight
                strokeWidth={3}
                className="h-4 w-4 text-emerald-500 transition-transform duration-200"
              />
            </button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default IngredientsPage;
