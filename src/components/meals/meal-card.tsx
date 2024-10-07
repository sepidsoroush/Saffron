import { Link } from "react-router-dom";

import { Meal } from "@/types";
import NoImageMeal from "./no-image-meal";
import CloudinaryImage from "@/components/shared/cloudinary-image";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  return (
    <Link to={`/meals/${meal.name}`} state={{ id: meal.id }}>
      <div className="w-full flex flex-col">
        {meal.imageUrl ? (
          <CloudinaryImage
            imageName={meal.name}
            width={500}
            height={500}
            className="h-40 rounded-xl object-cover"
          />
        ) : (
          <NoImageMeal />
        )}

        <div className="w-full bottom-0 min-h-8 rounded-lg  flex items-center">
          <span className="font-medium text-sm text-left">{meal.name}</span>
        </div>
      </div>
    </Link>
  );
};
