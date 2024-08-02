import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMealById } from "@/store/meals/meals.selector";
import { selectCompositionsByMealId } from "@/store/compositions/compositions.selector";

import IngredientListItem from "@/components/ingredients/ingredient-list-item";
import { FormTitle } from "@/components/meals/form-title";

const MealDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mealId = Number(location.pathname.split("/")[2]);

  const mealToUpdate = useAppSelector(selectMealById(mealId));
  const ingredientsInRecipe = useAppSelector((state) =>
    selectCompositionsByMealId(state, mealId)
  );

  const editMealHandler = () => {
    navigate(`/meals/${mealId}/edit`);
  };

  return (
    <>
      <FormTitle
        backLink="/meals"
        title={mealToUpdate?.name || ""}
        actionTitle="Edit"
        action={editMealHandler}
        className="px-4"
      />
      <div className="p-4">
        <img src="" />
        <h1 className="text-2xl my-2">{mealToUpdate?.name}</h1>
        {ingredientsInRecipe.length !== 0 ? (
          <p className="text-gray-500 mb-2">Ingredients:</p>
        ) : null}
        <ul>
          {ingredientsInRecipe.map((item) => (
            <IngredientListItem key={item.id} ingredient={item.ingredient} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default MealDetails;
