import { Link } from "react-router-dom";

import { Card, CardTitle } from "@/components/ui/card";

import { Meal } from "@/types";

type Props = {
  meal: Meal;
};

export const MealCard = ({ meal }: Props) => {
  return (
    <Link to={`/meals/${meal.id}`}>
      <Card className="my-2 overflow-x-hidden flex flex-row">
        <img src={meal.imageUrl || "NoImages.png"} width={150} height={150} />
        <CardTitle className="text-lg px-4 py-2">{meal.name}</CardTitle>
      </Card>
    </Link>
  );
};
