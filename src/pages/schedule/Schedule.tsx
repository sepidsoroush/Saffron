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
    <div className="flex flex-col min-h-screen">
      <Header>Weekly Schedule</Header>
      <div className="h-[calc(100vh-150px)] p-2">
        {scheduleWithMeals
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Card
              key={item.id}
              className="flex flex-row justify-between items-center border mb-2 px-2"
            >
              <span className="py-4">{item.day}</span>
              {item.meal ? (
                <div className="flex flex-row flex-end items-center">
                  <span className="px-2 py-4">{item.meal.name}</span>
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
            </Card>
          ))}
      </div>
    </div>
  );
}

export default SchedulePage;
