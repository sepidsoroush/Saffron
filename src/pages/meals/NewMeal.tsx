import React from "react";
import MealForm from "@/components/meals/meal-form";

const NewMealPage: React.FC = () => {
  return (
    <div className="p-4">
      <MealForm actionType="create" />
    </div>
  );
};

export default NewMealPage;
