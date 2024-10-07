import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMealById } from "@/store/meals/meals.selector";
import { selectCompositionsByMealId } from "@/store/compositions/compositions.selector";

import IngredientListItem from "@/components/ingredients/ingredient-list-item";
import { FormTitle } from "@/components/meals/form-title";
import NoImageMeal from "@/components/meals/no-image-meal";
import { FavoriteMeal } from "@/components/meals/favorite-meal";
import CloudinaryImage from "@/components/shared/cloudinary-image";

const MealDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mealName = location.pathname.split("/")[2];
  const mealId = location.state.id;

  const mealToUpdate = useAppSelector(selectMealById(mealId));
  const ingredientsInRecipe = useAppSelector((state) =>
    selectCompositionsByMealId(state, mealId)
  );

  const editMealHandler = () => {
    navigate(`/meals/${mealName}/edit`, { state: { id: mealId } });
  };

  return (
    <>
      <FormTitle
        // backLink="/meals"
        title={mealToUpdate?.name || ""}
        actionTitle="Edit"
        action={editMealHandler}
        className="px-4"
      />
      <div className="flex flex-col md:flex-row">
        {mealToUpdate?.imageUrl ? (
          <CloudinaryImage
            imageNameOrUrl={mealToUpdate.imageUrl}
            width={500}
            height={500}
            className="w-full md:w-[300px] md:h-[300px] md:rounded-xl md:m-4 object-cover"
          />
        ) : (
          <NoImageMeal />
        )}
        <div className="p-4 mb-[72px]">
          <div className="flex flex-row justify-between items-center mb-2">
            <h1 className="text-3xl">{mealToUpdate?.name}</h1>
            {mealToUpdate && <FavoriteMeal meal={mealToUpdate} />}
          </div>
          {ingredientsInRecipe.length !== 0 ? (
            <p className="text-gray-500 mb-2">Ingredients:</p>
          ) : null}
          <ul>
            {ingredientsInRecipe.map((item) => (
              <IngredientListItem key={item.id} ingredient={item.ingredient} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MealDetails;
