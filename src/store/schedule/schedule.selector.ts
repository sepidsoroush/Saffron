import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { selectScheduleWithMeals } from "../meals/meals.selector";
import { selectCompositionsByMealId } from "../compositions/compositions.selector";

export const selectIngredientsByMealId = createSelector(
  [selectScheduleWithMeals, (state: RootState) => state],
  (scheduleWithMeals, state) =>
    scheduleWithMeals.reduce((acc, schedule) => {
      if (schedule.meal?.id) {
        acc[schedule.meal.id] = selectCompositionsByMealId(
          state,
          schedule.meal.id
        );
      }
      return acc;
    }, {} as Record<number, ReturnType<typeof selectCompositionsByMealId>>)
);
