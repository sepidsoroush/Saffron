import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { IngredientItem } from "../ingredients/ingredient-item";
import { Ingredient } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  header: string;
  items: Ingredient[];
  className?: string;
};

export const CategoryCard: React.FC<Props> = ({ header, items, className }) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  const handleActivate = (id: number) => {
    setActiveItemId(id);
  };

  const handleDeactivate = () => {
    setActiveItemId(null);
  };

  return (
    <Card>
      <CardHeader className={cn("text-sm md:text-base", className)}>
        {header}
      </CardHeader>
      <CardContent className="divide-y divide-gray-100">
        {items.map((item) => (
          <IngredientItem
            key={item.id}
            item={item}
            deleteVisible={activeItemId === item.id}
            onActivate={() => handleActivate(item.id)}
            onDeactivate={handleDeactivate}
          />
        ))}
      </CardContent>
    </Card>
  );
};
