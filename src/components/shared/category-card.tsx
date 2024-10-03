import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { IngredientItem } from "../ingredients/ingredient-item";
import { Ingredient } from "@/types";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  header: string;
  items: Ingredient[];
  className?: string;
};

export const CategoryCard: React.FC<Props> = ({ header, items, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleHeader = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card>
      <CardHeader
        className={cn(
          "text-base font-bold md:text-lg flex flex-row justify-between items-center w-full",
          className
        )}
      >
        {header}
        <motion.button
          onClick={toggleHeader}
          className="text-lime-600"
          animate={{ rotate: isOpen ? 0 : 90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight />
        </motion.button>
      </CardHeader>
      <motion.div
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0.5 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ height: { duration: 0.5 }, opacity: { duration: 0.3 } }}
        style={{ overflow: "hidden" }}
      >
        <CardContent className="divide-y divide-gray-100 dark:divide-gray-800">
          {items
            .sort((a, b) => Number(a.available) - Number(b.available))
            .map((item) => (
              <IngredientItem key={item.id} item={item} />
            ))}
        </CardContent>
      </motion.div>
    </Card>
  );
};
