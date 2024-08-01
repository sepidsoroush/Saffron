import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { IngredientItem } from "../ingredients/ingredient-item";
import { Ingredient, Grocery } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  header: string;
  items: Ingredient[] | Grocery[];
  className?: string;
};

export const CategoryCard: React.FC<Props> = ({ header, items, className }) => (
  <Card>
    <CardHeader className={cn("text-sm md:text-base", className)}>
      {header}
    </CardHeader>
    <CardContent className="divide-y divide-gray-300">
      {items.map((item) => (
        <IngredientItem key={item.id} item={item} />
      ))}
    </CardContent>
  </Card>
);
