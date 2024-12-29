import React from "react";
import MealForm from "@/components/meals/meal-form";
import { FormTitle } from "@/components/meals/form-title";

const NewMealPage: React.FC = () => {
  return (
    <>
      <FormTitle backLink="/meals" title="Add a new meal" />
      <MealForm actionType="create" />
    </>
  );
};

export default NewMealPage;
