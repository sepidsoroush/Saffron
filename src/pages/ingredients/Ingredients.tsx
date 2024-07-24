import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";

import {
  selectEssentialItems,
  selectNeedToPurchase,
  selectAvailableIngredients,
  selectEssentialItemsLength,
} from "@/store/ingredients/ingredients.selector";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import NewIngredient from "@/components/ingredients/new-ingredient";
import { IngredientItem } from "@/components/ingredients/ingredient-item";

import { Ingredient } from "@/types";
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
      {isCreating ? <NewIngredient setIsCreating={setIsCreating} /> : null}
      <ul className="flex-1 p-2 flex flex-col gap-2 md:grid md:grid-cols-3 md:space-y-0 mb-[64px] md:mb-0">
        {essentialItemsLength !== 0 ? (
          <IngredientCategoryCard
            header="Essential items for schedule"
            ingredients={essentialItems}
            className="text-red-600 font-bold py-4"
          />
        ) : null}

        <IngredientCategoryCard
          header="Need to purchase"
          ingredients={needToPurchase}
          className="font-semibold py-4"
        />
        <IngredientCategoryCard
          header="Available Ingredients"
          ingredients={availableIngredients}
          className="py-4"
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
      </ul>
    </div>
  );
}

export default IngredientsPage;

interface CardProps {
  header: string;
  ingredients: Ingredient[];
  className?: string;
}

const IngredientCategoryCard: React.FC<CardProps> = ({
  header,
  ingredients,
  className,
}) => (
  <Card>
    <CardHeader className={className}>{header}</CardHeader>
    <CardContent>
      {ingredients.map((ingredient) => (
        <IngredientItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </CardContent>
  </Card>
);
