import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { IngredientItem } from "../ingredients/ingredient-item";
import { Ingredient, Grocery } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  header: string;
  items: Ingredient[] | Grocery[];
  category: "ingredient" | "grocery";
  className?: string;
};

export const CategoryCard: React.FC<Props> = ({
  header,
  items,
  className,
  category,
}) => (
  <Card>
    <CardHeader className={cn("text-sm md:text-base", className)}>
      {header}
    </CardHeader>
    <CardContent className="divide-y divide-gray-300">
      {items.map((item) => (
        <IngredientItem key={item.id} item={item} category={category} />
      ))}
    </CardContent>
  </Card>
);
