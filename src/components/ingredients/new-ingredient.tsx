import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import IngredientForm from "./ingredient-form";
import { Plus } from "lucide-react";

const NewIngredient: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  const newItemHandler = () => {
    setIsCreating(true);
  };

  const finishCreatingHandler = () => {
    setIsCreating(false);
  };

  return (
    <div>
      {isCreating ? (
        <IngredientForm type="create" onFinish={finishCreatingHandler} />
      ) : (
        <Button className="gap-1 w-full" onClick={newItemHandler}>
          <Plus size={18} />
          <span className="text-base font-light">New Item</span>
        </Button>
      )}
    </div>
  );
};

export default NewIngredient;
