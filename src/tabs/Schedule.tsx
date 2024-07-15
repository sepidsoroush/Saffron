import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Schedule, Meal } from "@/types";
import { SelectMealComboBox } from "@/components/meals/select-meal";

function ScheduleTab() {
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

  return (
    <ul className="container">
      {schedule.map((item) => {
        const meal = mealsMap[item.meal_id];
        return (
          <li key={item.day} className="flex flex-row justify-between border">
            <span>{item.day}</span>
            {meal ? <p>{meal.name}</p> : <SelectMealComboBox day={item.day} />}
          </li>
        );
      })}
    </ul>
  );
}

export default ScheduleTab;
