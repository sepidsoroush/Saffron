import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSchedule,
  updateSchedule,
  addSchedule,
} from "@/store/schedule/schedule.actions";
import { selectScheduleWithMeals } from "@/store/meals/meals.selector";

import { Card } from "@/components/ui/card";
import { SelectMealComboBox } from "@/components/meals/select-meal";
import { Settings1Fill } from "@/components/shared/icons";

import { WeekDay } from "@/types/constants";

import { X } from "lucide-react";
import { uniqueId } from "@/lib/utils";
import { emptySchedule } from "@/types/constants";
import { Link } from "react-router-dom";

function SchedulePage() {
  const dispatch = useAppDispatch();
  const scheduleWithMeals = useAppSelector(selectScheduleWithMeals);

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
    // showSuccessToast("Meal removed from weekly schedule!");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full top-0 z-10 bg-background/60 backdrop-blur-xl transition-all h-[72px]">
        <div className="text-lg font-bold text-left">Plan</div>

        <Link to="/setting" className="text-zinc-400 block md:hidden">
          <Settings1Fill width={24} height={24} />
        </Link>
      </div>
      <div className="space-y-4 md:mb-4">
        {completeSchedule
          .sort((a, b) => a.day_id - b.day_id)
          .map((item) => (
            <div key={item.day_id}>
              <div className="text-sm font-semibold text-neutral-400 mb-2">
                {item.day}
              </div>
              <Card className="flex flex-row justify-center items-center rounded-xl border-dashed border-neutral-200 relative shadow-none">
                {item.meal ? (
                  <>
                    <Link
                      to={`/meals/${item.meal.name}`}
                      state={{ id: item.meal.id }}
                      className="p-2 hover:underline"
                    >
                      {item.meal?.name}
                    </Link>
                    <span className="top-0 right-0 absolute p-1">
                      <X
                        color="#ef4444"
                        size={16}
                        onClick={() => handleDeleteMeal(item.day)}
                      />
                    </span>
                  </>
                ) : (
                  <SelectMealComboBox
                    day={item.day}
                    onMealChange={handleMealChange}
                  />
                )}
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SchedulePage;
