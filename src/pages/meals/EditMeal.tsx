import React from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMealById } from "@/store/meals/meals.selector";
import MealForm from "@/components/meals/meal-form";
import { FormTitle } from "@/components/meals/form-title";

const EditMealPage: React.FC = () => {
  const location = useLocation();
  const mealId = Number(location.pathname.split("/")[2]);

  const mealToUpdate = useAppSelector(selectMealById(mealId));

  return (
    <>
      <FormTitle
        backLink={`/meals/${mealToUpdate?.id}`}
        title="Edit selected meal"
        className="px-4"
      />
      <div className="px-4 mb-[72px]">
        <MealForm actionType="update" mealToUpdate={mealToUpdate} />
      </div>
    </>
  );
};

export default EditMealPage;
