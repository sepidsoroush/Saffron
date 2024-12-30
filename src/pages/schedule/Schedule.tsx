import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSchedule,
  updateSchedule,
  addSchedule,
} from "@/store/schedule/schedule.actions";
import { selectScheduleWithMeals } from "@/store/meals/meals.selector";

import { Card } from "@/components/ui/card";
import CloudinaryImage from "@/components/shared/cloudinary-image";
import { Header } from "@/components/layout/header";
import { SelectMealComboBox } from "@/components/meals/select-meal";
import NoImageMeal from "@/components/meals/no-image-meal";
import { CloseFill, Settings1Fill } from "@/components/shared/icons";

import { WeekDay, emptySchedule } from "@/types/constants";
import { uniqueId } from "@/lib/utils";

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
  };

  return (
    <div className="flex flex-col w-full">
      <Header
        mobileActionComponent={
          <Link to="/setting" className="text-zinc-400 block md:hidden">
            <Settings1Fill width={24} height={24} />
          </Link>
        }
      >
        Plan
      </Header>
      <div className="space-y-4 md:mb-4">
        {completeSchedule
          .sort((a, b) => a.day_id - b.day_id)
          .map((item) => (
            <div key={item.day_id}>
              <div className="text-sm font-semibold text-neutral-400 mb-2">
                {item.day}
              </div>

              {item.meal ? (
                <Card className="flex flex-col justify-center items-start rounded-xl border border-neutral-200 relative shadow-none">
                  {item.meal.imageUrl ? (
                    <CloudinaryImage
                      imageNameOrUrl={item.meal.imageUrl}
                      width={500}
                      height={500}
                      className="p-1 h-36 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <NoImageMeal />
                  )}
                  <Link
                    to={`/meals/${item.meal.name}`}
                    state={{ id: item.meal.id }}
                    className="p-2 hover:underline text-lg font-semibold"
                  >
                    {item.meal?.name}
                  </Link>

                  <div
                    className="top-0 right-0 absolute p-2"
                    onClick={() => handleDeleteMeal(item.day)}
                  >
                    <div className="text-neutral-600 bg-neutral-100/50 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner">
                      <CloseFill width={16} height={16} />
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="flex flex-row justify-center items-center rounded-xl border border-dashed border-neutral-200 relative shadow-none">
                  <SelectMealComboBox
                    day={item.day}
                    onMealChange={handleMealChange}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SchedulePage;
