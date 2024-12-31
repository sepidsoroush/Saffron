import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import CloudinaryImage from "../shared/cloudinary-image";
import NoImageMeal from "../meals/no-image-meal";
import IngredientListItem from "../ingredients/ingredient-list-item";
import { Meal, Ingredient } from "@/types";
import { WeekDay } from "@/types/constants";
import { Delete3Line } from "../shared/icons";

interface MealCardDrawerProps {
  day: WeekDay;
  meal: Meal;
  onDelete: (day: WeekDay) => void;
  ingredients: {
    ingredient: Ingredient | undefined;
    id: number;
    meal_id: number;
    ingredient_id: number;
  }[];
}

export const MealCardDrawer = ({
  day,
  meal,
  ingredients,
  onDelete,
}: MealCardDrawerProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const MAXCOUNT = 7;

  return (
    <div className="flex flex-row justify-between items-start gap-[6px]">
      <Drawer direction={isDesktop ? "right" : "bottom"}>
        <DrawerTrigger asChild>
          <div className="flex flex-row items-start gap-[6px]">
            {meal.imageUrl ? (
              <CloudinaryImage
                imageNameOrUrl={meal.imageUrl}
                width={500}
                height={500}
                className="h-[72px] w-[72px] rounded-xl object-cover"
              />
            ) : (
              <NoImageMeal />
            )}
            <div className="w-full">
              <div className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200">
                {meal?.name}
              </div>
              <div>
                <ul className="flex fle-row flex-wrap gap-1">
                  {ingredients
                    .sort(
                      (a, b) =>
                        Number(a.ingredient?.available) -
                        Number(b.ingredient?.available)
                    )
                    .slice(0, MAXCOUNT)
                    .map((comp) => (
                      <Badge
                        key={comp.id}
                        variant="outline"
                        className={cn(
                          "text-xs font-medium py-[3px] px-2",
                          comp.ingredient?.available
                            ? "text-neutral-500"
                            : "text-yellow-700 bg-yellow-100 border border-yellow-200"
                        )}
                      >
                        {comp.ingredient?.name}
                      </Badge>
                    ))}

                  {ingredients.length > MAXCOUNT && (
                    <Badge
                      variant="outline"
                      className="text-xs font-medium text-neutral-500 py-[3px] px-2"
                    >
                      {`+ ${ingredients.length - MAXCOUNT}`}
                    </Badge>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="max-h-[80vh] overflow-y-auto">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200 fixed flex justify-center items-end w-full bg-white py-2 top-5">
                {day}
              </DrawerTitle>
              <DrawerDescription className="px-4">
                {meal.imageUrl ? (
                  <CloudinaryImage
                    imageNameOrUrl={meal.imageUrl}
                    width={500}
                    height={500}
                    className={cn(
                      "h-[200px] w-full rounded-xl object-cover mt-12"
                    )}
                  />
                ) : (
                  <NoImageMeal />
                )}
              </DrawerDescription>
            </DrawerHeader>
            <div className="w-full p-4 gap-3">
              <div className="flex flex-row justify-between items-center py-[3px] w-full">
                <div className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200">
                  {meal?.name}
                </div>
                <div
                  onClick={() => onDelete(day)}
                  className="text-neutral-500 hover:text-orange-600 focus:text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
                >
                  <Delete3Line width={16} height={16} />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-neutral-400">
                  Ingredients
                </span>
                <ul className="divide-y divide-dashed divide-neutral-100 dark:divide-neutral-800">
                  {ingredients.map((item) => (
                    <IngredientListItem
                      key={item.id}
                      ingredient={item.ingredient}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <div
        onClick={() => onDelete(day)}
        className="text-neutral-500 hover:text-orange-600 focus:text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
      >
        <Delete3Line width={16} height={16} />
      </div>
    </div>
  );
};
