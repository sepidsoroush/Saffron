import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSchedule,
  updateSchedule,
  addSchedule,
} from "@/store/schedule/schedule.actions";
import { selectScheduleWithMeals } from "@/store/meals/meals.selector";
import { selectIngredientsByMealId } from "@/store/schedule/schedule.selector";

import { Header } from "@/components/layout/header";
import { SelectMealComboBox } from "@/components/meals/select-meal";
import { MealInPlanCard } from "@/components/plan/meal-in-plan-card";
import Settings from "@/components/setting/settings";
import { WeekDay, emptySchedule } from "@/types/constants";
import { uniqueId } from "@/lib/utils";

function PlanPage() {
  const dispatch = useAppDispatch();
  const scheduleWithMeals = useAppSelector(selectScheduleWithMeals);
  const ingredientsByMealId = useAppSelector(selectIngredientsByMealId);

  const completeSchedule = emptySchedule.map((emptyItem) => {
    const scheduleItem = scheduleWithMeals.find(
      (item) => item.day === emptyItem.day
    );
    return scheduleItem || emptyItem;
  });

  const handleMealChange = (day: WeekDay, mealId: number) => {
    const existingSchedule = scheduleWithMeals.find(
      (schedule) => schedule.day === day
    );

    if (existingSchedule) {
      dispatch(updateSchedule(day, mealId));
    } else {
      const newScheduleId = emptySchedule.find(
        (schedule) => schedule.day === day
      )?.day_id;
      if (newScheduleId !== undefined) {
        const newSchedule = {
          id: uniqueId(),
          day_id: newScheduleId,
          day,
          meal_id: mealId,
        };
        dispatch(addSchedule(newSchedule));
      } else {
        console.error("Error: Invalid day provided");
      }
    }
  };

  const handleDeleteMeal = (day: WeekDay) => {
    dispatch(deleteSchedule(day));
  };

  const today = new Date().toLocaleString("en-us", { weekday: "long" });

  return (
    <div className="flex flex-col mt-[72px]">
      <Header actionComponent={<Settings />}>Plan</Header>

      <div className="space-y-4 md:mb-4">
        {completeSchedule
          .sort((a, b) => a.day_id - b.day_id)
          .map((item) => {
            const ingredients =
              item.meal?.id && ingredientsByMealId[item.meal.id]
                ? ingredientsByMealId[item.meal.id]
                : [];
            return (
              <div key={item.day_id}>
                {item.day === today ? (
                  <div className="text-sm font-semibold text-orange-600 mb-2">
                    Today
                  </div>
                ) : (
                  <div className="text-sm font-semibold text-neutral-400 mb-2">
                    {item.day}
                  </div>
                )}

                {item.meal ? (
                  <MealInPlanCard
                    meal={item.meal}
                    ingredients={ingredients}
                    day={item.day}
                    onDelete={handleDeleteMeal}
                  />
                ) : (
                  <div className="flex flex-row justify-center items-center rounded-xl border border-dashed border-neutral-200 relative shadow-none">
                    <SelectMealComboBox
                      day={item.day}
                      onMealChange={handleMealChange}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlanPage;
