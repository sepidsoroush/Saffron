import { Dispatch, SetStateAction } from "react";

import IngredientForm from "./ingredient-form";

type Props = {
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  category: "ingredient" | "grocery";
};

const NewIngredient = ({ setIsCreating, category }: Props) => {
  const finishCreatingHandler = () => {
    setIsCreating(false);
  };

  return (
    <div className="p-2">
      <IngredientForm
        type="create"
        onFinish={finishCreatingHandler}
        category={category}
      />
    </div>
  );
};

export default NewIngredient;
