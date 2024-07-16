import { useEffect, useState } from "react";

import { SelectMealComboBox } from "@/components/meals/select-meal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSchedule } from "@/store/actions/schedule-actions";

import { Schedule, Meal } from "@/types";
import { WeekDay } from "@/types/constants";

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

  return (
    <ul className="grid grid-rows-7">
      {schedule.map((item) => {
        const meal = mealsMap[item.meal_id];
        return (
          <li
            key={item.id}
            className="flex flex-row justify-between items-center border pr-2"
          >
            <span className="px-2 py-4">{item.day}</span>
            {meal ? (
              <span className="px-2 py-4">{meal.name}</span>
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
