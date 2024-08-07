import { Link } from "react-router-dom";

import { Meal } from "@/types";
import NoImageMeal from "./no-image-meal";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  return (
    <Link to={`/meals/${meal.id}`}>
      <div className="w-full flex flex-col">
        {meal.imageUrl ? (
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="h-40 rounded-xl object-cover border border-gray-200"
          />
        ) : (
          <NoImageMeal />
        )}

        <div className="w-full bottom-0 min-h-8 rounded-lg bg-white bg-opacity-75 flex items-center">
          <span className="font-medium text-sm text-left">{meal.name}</span>
        </div>
      </div>
    </Link>
  );
};
