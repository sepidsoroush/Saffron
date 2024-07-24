import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { IngredientItem } from "../ingredients/ingredient-item";
import { Ingredient, Grocery } from "@/types";

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
    <CardHeader className={className}>{header}</CardHeader>
    <CardContent>
      {items.map((item) => (
        <IngredientItem key={item.id} item={item} category={category} />
      ))}
    </CardContent>
  </Card>
);
