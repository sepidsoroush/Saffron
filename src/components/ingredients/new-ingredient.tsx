import { Dispatch, SetStateAction } from "react";

import IngredientForm from "./ingredient-form";

type Props = {
  setIsCreating: Dispatch<SetStateAction<boolean>>;
};

const NewIngredient = ({ setIsCreating }: Props) => {
  const finishCreatingHandler = () => {
    setIsCreating(false);
  };

  return (
    <div className="p-2">
      <IngredientForm type="create" onFinish={finishCreatingHandler} />
    </div>
  );
};

export default NewIngredient;
