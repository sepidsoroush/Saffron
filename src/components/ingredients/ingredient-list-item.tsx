import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Ingredient } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  ingredient: Ingredient | undefined;
};

const IngredientListItem = ({ ingredient }: Props) => {
  if (!ingredient) {
    return;
  }

  return (
    <li className="flex flex-row justify-start items-center my-1">
      <Checkbox
        checked={ingredient.available}
        className={cn(
          ingredient?.available
            ? "data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            : "",
          "cursor-not-allowed"
        )}
        id={`ingredient-${ingredient.id}`}
      />

      <Label
        htmlFor={`ingredient-${ingredient.id}`}
        className={cn(
          ingredient.available ? "text-gray-400" : "",
          "ml-1 text-sm font-light"
        )}
      >
        {ingredient.name}
      </Label>
    </li>
  );
};

export default IngredientListItem;
