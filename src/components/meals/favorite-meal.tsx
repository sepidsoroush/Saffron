import { useAppDispatch } from "@/store/hooks";
import { updateMeal } from "@/store/meals/meals.actions";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Meal } from "@/types";

type Props = {
  meal: Meal;
};

export function FavoriteMeal({ meal }: Props) {
  const dispatch = useAppDispatch();

  const toggleLike = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up

    const updatedMeal = { ...meal, liked: !meal.liked };

    dispatch(updateMeal(meal.id, updatedMeal));
  };

  return (
    <motion.div whileTap={{ scale: 0.8 }} onClick={toggleLike}>
      <motion.div animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
        <Heart
          className={cn(
            "w-6 h-6",
            meal.liked ? "text-red-600 fill-current" : "text-gray-600"
          )}
        />
      </motion.div>
    </motion.div>
  );
}
