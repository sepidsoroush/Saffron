import React from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import MealForm from "@/components/meals/meal-form";
import { Meal } from "@/types";

const EditMealPage: React.FC = () => {
  const location = useLocation();
  const mealId = Number(location.pathname.split("/")[2]);

  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);
  const mealToUpdate = meals.find((item) => item.id === mealId);

  console.log(mealToUpdate);

  return <MealForm actionType="update" mealToUpdate={mealToUpdate} />;
};

export default EditMealPage;
