import React from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMealById } from "@/store/meals/meals.selector";
import MealForm from "@/components/meals/meal-form";
import { FormTitle } from "@/components/meals/form-title";

const EditMealPage: React.FC = () => {
  const location = useLocation();
  const mealId = location.state.id;
  const mealToUpdate = useAppSelector(selectMealById(mealId));

  return (
    <>
      <FormTitle
        backLink={`/meals/${mealToUpdate?.name}`}
        backLinkId={mealId}
        title="Edit selected meal"
      />
      <MealForm actionType="update" mealToUpdate={mealToUpdate} />
    </>
  );
};

export default EditMealPage;
