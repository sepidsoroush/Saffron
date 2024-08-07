import React from "react";
import MealForm from "@/components/meals/meal-form";
import { FormTitle } from "@/components/meals/form-title";

const NewMealPage: React.FC = () => {
  return (
    <>
      <FormTitle backLink="/meals" title="Add a new meal" className="px-4" />
      <div className="p-4 mb-[72px]">
        <MealForm actionType="create" />
      </div>
    </>
  );
};

export default NewMealPage;
