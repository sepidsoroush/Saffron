import { Meal } from "@/types";
import NoImageMeal from "./no-image-meal";
import CloudinaryImage from "@/components/shared/cloudinary-image";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  return (
    <div className="w-full flex flex-col rounded-[14px] bg-white shadow-cards">
      {meal.imageUrl ? (
        <CloudinaryImage
          imageNameOrUrl={meal.imageUrl}
          width={500}
          height={500}
          className="h-28 object-cover rounded-t-[14px]"
        />
      ) : (
        <NoImageMeal />
      )}

      <div className="w-full bottom-0 min-h-14 flex flex-col items-start py-1 px-[9px]">
        <div className="font-semibold text-sm text-neutral-800 whitespace-nowrap mb-1.5">
          {meal.name.length > 18 ? `${meal.name.slice(0, 18)}...` : meal.name}
        </div>
        <div className="font-medium text-xs text-neutral-500">
          {meal.cuisine}
        </div>
      </div>
    </div>
  );
};
