import { useAppDispatch } from "@/store/hooks";
import { updateIngredient } from "@/store/ingredients-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Ingredient } from "@/types";

type Props = {
  ingredient: Ingredient;
};

export const IngredientItem = ({ ingredient }: Props) => {
  const dispatch = useAppDispatch();

  const checkboxHandler = () => {
    dispatch(
      updateIngredient(ingredient.id, {
        ...ingredient,
        available: !ingredient.available,
      })
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`ingredient-${ingredient.id}`}
        checked={ingredient.available}
        className={
          ingredient.available
            ? "data-[state=checked]:bg-gray-300 data-[state=checked]:border-gray-300"
            : ""
        }
        onClick={checkboxHandler}
      />
      <Label
        htmlFor={`ingredient-${ingredient.id}`}
        className={
          ingredient.available ? "text-gray-400 line-through font-normal" : ""
        }
      >
        {ingredient.name}
      </Label>
    </div>
  );
};
