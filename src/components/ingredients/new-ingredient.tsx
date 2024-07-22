import React, { useState } from "react";

import IngredientForm from "./ingredient-form";
import NewItem from "@/components/shared/new-Item";

const NewIngredient: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  const newItemHandler = () => {
    setIsCreating(true);
  };

  const finishCreatingHandler = () => {
    setIsCreating(false);
  };

  return (
    <div className="">
      {isCreating ? (
        <IngredientForm type="create" onFinish={finishCreatingHandler} />
      ) : (
        <NewItem onClick={newItemHandler} title="New Item" />
      )}
    </div>
  );
};

export default NewIngredient;
