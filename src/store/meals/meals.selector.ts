import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

import { Meal } from "@/types";

export const selectMeals = (state: RootState) => state.meals.meals;
const selectSchedule = (state: RootState) => state.schedule.schedule;

export const selectMealIdsInSchedule = createSelector(
  [selectSchedule],
  (schedule) => schedule.map((item) => Number(item.meal_id)).filter(Boolean)
);

export const selectFilteredMeals = createSelector(
  [selectMeals, selectMealIdsInSchedule],
  (meals, mealIdsInSchedule) =>
    meals.filter((meal) => !mealIdsInSchedule.includes(meal.id))
);

export const selectMealById = (mealId: number) =>
  createSelector([selectMeals], (meals) =>
    meals.find((meal) => meal.id === mealId)
  );

// Selector to create a map of meal IDs to meal objects
export const selectMealsMap = createSelector([selectMeals], (meals) =>
  meals.reduce((acc, meal) => {
    acc[meal.id] = meal;
    return acc;
  }, {} as Record<number, Meal>)
);

// Selector to get the schedule with associated meals
export const selectScheduleWithMeals = createSelector(
  [selectSchedule, selectMealsMap],
  (schedule, mealsMap) =>
    schedule.map((entry) => ({
      ...entry,
      meal: entry.meal_id ? mealsMap[entry.meal_id] : undefined,
    }))
);
