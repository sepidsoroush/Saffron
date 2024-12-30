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
    <li className="flex flex-row justify-start items-center px-1 py-3">
      <Checkbox
        checked={ingredient.available}
        className={cn(
          ingredient?.available
            ? "data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            : "border-neutral-300",
          "cursor-not-allowed"
        )}
        id={`ingredient-${ingredient.id}`}
      />

      <Label
        htmlFor={`ingredient-${ingredient.id}`}
        className="ml-1.5 text-[15px] font-medium text-neutral-600 dark:text-neutral-400"
      >
        {ingredient.name}
      </Label>
    </li>
  );
};

export default IngredientListItem;
