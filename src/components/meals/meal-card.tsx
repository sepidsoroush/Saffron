import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppSelector } from "@/store/hooks";
import { selectCompositionsByMealId } from "@/store/compositions/compositions.selector";
import { cn } from "@/lib/utils";
import CloudinaryImage from "../shared/cloudinary-image";
import NoImageMeal from "../meals/no-image-meal";
import IngredientListItem from "../ingredients/ingredient-list-item";
import { Meal } from "@/types";
import { Delete3Line } from "../shared/icons";

interface MealCardProps {
  meal: Meal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  const ingredientsInRecipe = useAppSelector((state) =>
    selectCompositionsByMealId(state, meal.id)
  );
  return (
    <div className="flex flex-row justify-between items-start space-x-1.5">
      <Drawer>
        <DrawerTrigger asChild>
          <div className="w-full flex flex-col rounded-[14px] bg-white shadow-cards">
            {meal.imageUrl ? (
              <CloudinaryImage
                imageNameOrUrl={meal.imageUrl}
                width={500}
                height={500}
                className="h-28 object-cover rounded-t-[14px]"
              />
            ) : (
              <NoImageMeal className="w-full h-[117px] rounded-t-[14px] rounded-b-none border-solid border" />
            )}

            <div className="w-full bottom-0 min-h-14 flex flex-col items-start py-1 px-[9px]">
              <div className="font-semibold text-sm text-neutral-800 whitespace-nowrap mb-1.5">
                {meal.name.length > 18
                  ? `${meal.name.slice(0, 18)}...`
                  : meal.name}
              </div>
              <div className="font-medium text-xs text-neutral-500">
                {meal.cuisine}
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="h-[80vh] overflow-y-auto">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200 fixed flex justify-center items-end w-full bg-white py-2 top-5">
                {meal.name}
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
                  <NoImageMeal className="h-20 w-20" />
                )}
              </DrawerDescription>
            </DrawerHeader>
            <div className="w-full p-4 gap-3">
              <div className="flex flex-row justify-between items-center py-[3px] w-full">
                <div className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200">
                  {meal?.name}
                </div>
                <div
                  onClick={() => console.log(meal.name)}
                  className="text-neutral-500 hover:text-orange-600 focus:text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
                >
                  <Delete3Line width={16} height={16} />
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-neutral-400">
                  Ingredients
                </div>
                <ul className="divide-y divide-dashed divide-neutral-100 dark:divide-neutral-800">
                  {ingredientsInRecipe.map((item) => (
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
    </div>
  );
};
