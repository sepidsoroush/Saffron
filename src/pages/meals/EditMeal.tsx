import React from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectMealById } from "@/store/meals/meals.selector";
import MealForm from "@/components/meals/meal-form";

const EditMealPage: React.FC = () => {
  const location = useLocation();
  const mealId = Number(location.pathname.split("/")[2]);

  const mealToUpdate = useAppSelector(selectMealById(mealId));

  return (
    <div className="p-4">
      <MealForm actionType="update" mealToUpdate={mealToUpdate} />
    </div>
  );
};

export default EditMealPage;
