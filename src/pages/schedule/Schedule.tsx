import { useEffect, useState } from "react";

import { SelectMealComboBox } from "@/components/meals/select-meal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSchedule,
  updateSchedule,
} from "@/store/actions/schedule-actions";

import { Schedule, Meal } from "@/types";
import { WeekDay } from "@/types/constants";

import { X } from "lucide-react";
import { showSuccessToast } from "@/lib/utils";

function SchedulePage() {
  const dispatch = useAppDispatch();

  const schedule = useAppSelector<Schedule[]>(
    (state) => state.schedule.schedule
  );
  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);

  const [mealsMap, setMealsMap] = useState<Record<string, Meal>>({});

  useEffect(() => {
    const mealsMap = meals.reduce((acc, meal) => {
      acc[meal.id] = meal;
      return acc;
    }, {} as Record<string, Meal>);
    setMealsMap(mealsMap);
  }, [meals]);

  const handleMealChange = (day: WeekDay, mealId: number) => {
    dispatch(updateSchedule(day, mealId));
  };

  const handleDeleteMeal = (day: WeekDay) => {
    dispatch(deleteSchedule(day));
    showSuccessToast("Meal removed from weekly schedule!");
  };

  return (
    <ul className="grid grid-rows-7">
      {[...schedule]
        .sort((a, b) => a.id - b.id)
        .map((item) => {
          const meal = item.meal_id ? mealsMap[item.meal_id] : undefined;
          return (
            <li
              key={item.id}
              className="flex flex-row justify-between items-center border pr-2"
            >
              <span className="px-2 py-4">{item.day}</span>
              {meal ? (
                <div className="flex flex-row flex-end items-center">
                  <span className="px-2 py-4">{meal.name}</span>
                  <X
                    color="#ff4747"
                    size={16}
                    onClick={() => handleDeleteMeal(item.day)}
                  />
                </div>
              ) : (
                <SelectMealComboBox
                  day={item.day}
                  onMealChange={handleMealChange}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default SchedulePage;
