import { Link } from "react-router-dom";

import { Meal } from "@/types";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  return (
    <Link to={`/meals/${meal.id}`}>
      <div className="w-full flex flex-col">
        <img
          src={meal.imageUrl || "NoImages.png"}
          alt={meal.name}
          className="h-40 rounded-xl object-cover border border-gray-200"
        />
        <div className="w-full bottom-0 min-h-8 rounded-lg bg-white bg-opacity-75 flex items-center">
          <span className="font-medium text-sm text-left">{meal.name}</span>
        </div>
      </div>
    </Link>
  );
};
