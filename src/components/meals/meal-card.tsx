import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCompositionsByMealId } from "@/store/compositions/compositions.selector";
import { selectCompositions } from "@/store/compositions/compositions.selector";
import { deleteComposition } from "@/store/compositions/compositions.actions";
import { deleteMeal } from "@/store/meals/meals.actions";

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
import { showErrorToast, showSuccessToast } from "@/lib/utils";

import { cn } from "@/lib/utils";
import CloudinaryImage from "../shared/cloudinary-image";
import NoImageMeal from "../meals/no-image-meal";
import IngredientListItem from "../ingredients/ingredient-list-item";
import { Meal } from "@/types";
import { Delete3Line, Pencil2Line } from "../shared/icons";
import MealForm from "./meal-form";

interface MealCardProps {
  meal: Meal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const ingredientsInRecipe = useAppSelector((state) =>
    selectCompositionsByMealId(state, meal.id)
  );
  const compositionsData = useAppSelector(selectCompositions);

  const deleteMealHandler = async () => {
    if (meal) {
      try {
        const compositionsToDelete = compositionsData.filter(
          (c) => c.meal_id === meal.id
        );
        const deleteCompositionPromises = compositionsToDelete.map((c) =>
          dispatch(deleteComposition(c.id))
        );
        await Promise.all(deleteCompositionPromises);
        await dispatch(deleteMeal(meal.id));
        showSuccessToast("Meal and related compositions deleted!");
      } catch (error) {
        showErrorToast(`Error deleting meal and compositions: ${error}`);
      }
    }
  };

  const editMealHandler = () => {
    setIsEditing(true);
  };

  const ModalComponent = isDesktop ? Sheet : Drawer;
  const TriggerComponent = isDesktop ? SheetTrigger : DrawerTrigger;
  const ContentComponent = isDesktop ? SheetContent : DrawerContent;
  const HeaderComponent = isDesktop ? SheetHeader : DrawerHeader;
  const TitleComponent = isDesktop ? SheetTitle : DrawerTitle;
  const DescriptionComponent = isDesktop ? SheetDescription : DrawerDescription;

  return (
    <div className="flex flex-row justify-between items-start space-x-1.5">
      <ModalComponent open={open} onOpenChange={setOpen}>
        <TriggerComponent asChild>
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
              <div className="font-semibold text-sm text-neutral-800 mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                {meal.name}
              </div>
              <div className="font-medium text-xs text-neutral-500">
                {meal.cuisine}
              </div>
            </div>
          </div>
        </TriggerComponent>
        <ContentComponent>
          <div
            className={cn("overflow-y-auto", isDesktop ? "h-full" : "h-[80vh]")}
          >
            {isEditing ? (
              <div className="px-4">
                <MealForm
                  actionType="update"
                  setOpen={setOpen}
                  mealToUpdate={meal}
                />
              </div>
            ) : (
              <>
                <HeaderComponent className="p-0">
                  <TitleComponent
                    className={cn(
                      "text-[17px] font-semibold text-neutral-800 dark:text-neutral-200 text-center"
                    )}
                  >
                    {meal.name}
                  </TitleComponent>
                  <DescriptionComponent className="px-4">
                    {meal.imageUrl ? (
                      <CloudinaryImage
                        imageNameOrUrl={meal.imageUrl}
                        width={500}
                        height={500}
                        className="h-[200px] w-full rounded-xl object-cover"
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
                    <div className="flex flex-row items-center space-x-1.5">
                      <div
                        className="text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
                        onClick={deleteMealHandler}
                      >
                        <Delete3Line width={16} height={16} />
                      </div>
                      <div
                        className="text-neutral-500 hover:text-orange-600 focus:text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
                        onClick={editMealHandler}
                      >
                        <Pencil2Line width={16} height={16} />
                      </div>
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
              </>
            )}
          </div>
        </ContentComponent>
      </ModalComponent>
    </div>
  );
};

export default MealCard;
