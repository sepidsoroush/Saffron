import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Ingredient } from "@/types";

type Props = {
  ingredient: Ingredient;
};

export const IngredientItem = ({ ingredient }: Props) => {
  const isChecked = ingredient.available;

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`ingredient-${ingredient.id}`}
        checked={isChecked}
        className={
          isChecked
            ? "data-[state=checked]:bg-gray-300 data-[state=checked]:border-gray-300"
            : ""
        }
      />
      <Label
        htmlFor={`ingredient-${ingredient.id}`}
        className={isChecked ? "text-gray-400 line-through font-normal" : ""}
      >
        {ingredient.name}
      </Label>
    </div>
  );
};
