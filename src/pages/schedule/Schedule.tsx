import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSchedule,
  updateSchedule,
} from "@/store/schedule/schedule.actions";
import { selectScheduleWithMeals } from "@/store/meals/meals.selector";

import { Card } from "@/components/ui/card";
import { SelectMealComboBox } from "@/components/meals/select-meal";
import { Header } from "@/components/layout/header";

import { WeekDay } from "@/types/constants";

import { X } from "lucide-react";
import { showSuccessToast } from "@/lib/utils";

function SchedulePage() {
  const dispatch = useAppDispatch();

  const scheduleWithMeals = useAppSelector(selectScheduleWithMeals);

  const handleMealChange = (day: WeekDay, mealId: number) => {
    dispatch(updateSchedule(day, mealId));
  };

  const handleDeleteMeal = (day: WeekDay) => {
    dispatch(deleteSchedule(day));
    showSuccessToast("Meal removed from weekly schedule!");
  };

  return (
    <div className="flex flex-col">
      <Header>Weekly Schedule</Header>
      <div className="p-2">
        {scheduleWithMeals
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id}>
              <span className="text-xs text-gray-500">{item.day}</span>
              <Card className="flex flex-row justify-center items-center border relative">
                {item.meal ? (
                  <>
                    <div className="p-2">{item.meal.name}</div>
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
