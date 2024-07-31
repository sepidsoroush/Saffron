import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSchedule,
  updateSchedule,
  addSchedule,
} from "@/store/schedule/schedule.actions";
import { selectScheduleWithMeals } from "@/store/meals/meals.selector";

import { Card } from "@/components/ui/card";
import { SelectMealComboBox } from "@/components/meals/select-meal";
import { Header } from "@/components/layout/header";

import { WeekDay } from "@/types/constants";

import { X } from "lucide-react";
import { showSuccessToast } from "@/lib/utils";

import { emptySchedule } from "@/lib/info";

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
          id: Math.floor(Math.random() * Math.pow(2, 20)),
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
    showSuccessToast("Meal removed from weekly schedule!");
  };

  return (
    <div className="flex flex-col mt-[72px]">
      <Header>Weekly Schedule</Header>
      <div className="p-2">
        {completeSchedule
          .sort((a, b) => a.day_id - b.day_id)
          .map((item) => (
            <div key={item.day_id}>
              <span className="text-xs text-gray-500">{item.day}</span>
              <Card className="flex flex-row justify-center items-center border relative">
                {item.meal_id ? (
                  <>
                    <div className="p-2">{item.meal?.name}</div>
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
