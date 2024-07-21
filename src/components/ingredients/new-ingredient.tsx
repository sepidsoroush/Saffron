import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import IngredientForm from "./ingredient-form";
import { CirclePlus } from "lucide-react";

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
        <Button
          variant="ghost"
          className="gap-1 justify-start"
          onClick={newItemHandler}
        >
          <CirclePlus size={18} color="#059669" />
          <span className="text-base font-medium text-emerald-600">
            New Item
          </span>
        </Button>
      )}
    </div>
  );
};

export default NewIngredient;
