import React from "react";
import MealForm from "@/components/meals/meal-form";

const NewMealPage: React.FC = () => {
  return <MealForm actionType="create" />;
};

export default NewMealPage;
