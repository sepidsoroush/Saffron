import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import CloudinaryImage from "@/components/shared/cloudinary-image";
import NoImageMeal from "@/components/meals/no-image-meal";
import IngredientListItem from "@/components/ingredients/ingredient-list-item";
import { Delete3Line } from "@/components/shared/icons";
import { Meal, Ingredient } from "@/types";
import { WeekDay } from "@/types/constants";
import { cn } from "@/lib/utils";

interface MealInPlanCardProps {
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

export const MealInPlanCard = ({
  day,
  meal,
  ingredients,
  onDelete,
}: MealInPlanCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const MAXCOUNT = isDesktop ? 20 : 7;

  const ModalComponent = isDesktop ? Sheet : Drawer;
  const TriggerComponent = isDesktop ? SheetTrigger : DrawerTrigger;
  const ContentComponent = isDesktop ? SheetContent : DrawerContent;
  const HeaderComponent = isDesktop ? SheetHeader : DrawerHeader;
  const TitleComponent = isDesktop ? SheetTitle : DrawerTitle;
  const DescriptionComponent = isDesktop ? SheetDescription : DrawerDescription;

  return (
    <div className="flex flex-row justify-between items-start space-x-1.5 overflow-hidden">
      <ModalComponent>
        <TriggerComponent asChild>
          <div className="w-full flex flex-row flex-nowrap space-x-1.5 cursor-pointer overflow-hidden">
            {meal.imageUrl ? (
              <CloudinaryImage
                imageNameOrUrl={meal.imageUrl}
                width={500}
                height={500}
                className="h-[72px] w-[72px] rounded-xl object-cover"
              />
            ) : (
              <NoImageMeal className="h-[72px] w-[72px]" />
            )}
            <div>
              <div className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200 overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-45px)]">
                {meal?.name}
              </div>
              <ul className="flex fle-row flex-wrap gap-1 max-w-[calc(100%-10px)] max-h-14">
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
        </TriggerComponent>
        <ContentComponent>
          <div
            className={cn("overflow-y-auto", isDesktop ? "h-full" : "h-[80vh]")}
          >
            <HeaderComponent className="p-0">
              <TitleComponent className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200 text-center">
                {day}
              </TitleComponent>
              <DescriptionComponent className="px-4">
                {meal.imageUrl ? (
                  <CloudinaryImage
                    imageNameOrUrl={meal.imageUrl}
                    width={500}
                    height={500}
                    className={cn("h-[200px] w-full rounded-xl object-cover")}
                  />
                ) : (
                  <NoImageMeal className="h-20 w-20" />
                )}
              </DescriptionComponent>
            </HeaderComponent>
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
        </ContentComponent>
      </ModalComponent>
      <div
        onClick={() => onDelete(day)}
        className="text-neutral-500 hover:text-orange-600 focus:text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
      >
        <Delete3Line width={16} height={16} />
      </div>
    </div>
  );
};
