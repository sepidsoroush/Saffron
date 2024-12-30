import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSchedule,
  updateSchedule,
  addSchedule,
} from "@/store/schedule/schedule.actions";
import { selectScheduleWithMeals } from "@/store/meals/meals.selector";
import { selectCompositionsByMealId } from "@/store/compositions/compositions.selector";

import CloudinaryImage from "@/components/shared/cloudinary-image";
import { Header } from "@/components/layout/header";
import { SelectMealComboBox } from "@/components/meals/select-meal";
import NoImageMeal from "@/components/meals/no-image-meal";
import { Delete3Line, Settings1Fill } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";

import { WeekDay, emptySchedule } from "@/types/constants";
import { cn, uniqueId } from "@/lib/utils";

function SchedulePage() {
  const dispatch = useAppDispatch();
  const scheduleWithMeals = useAppSelector(selectScheduleWithMeals);

  const ingredientsByMealId = useAppSelector((state) =>
    scheduleWithMeals.reduce((acc, schedule) => {
      if (schedule.meal?.id) {
        acc[schedule.meal.id] = selectCompositionsByMealId(
          state,
          schedule.meal.id
        );
      }
      return acc;
    }, {} as Record<number, ReturnType<typeof selectCompositionsByMealId>>)
  );

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
          .map((item) => {
            const MAXCOUNT = 6;
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
                  <div className="flex flex-row justify-between items-start gap-[6px]">
                    <Link
                      to={`/meals/${item.meal.name}`}
                      state={{ id: item.meal.id }}
                      className="flex flex-row items-start gap-[6px]"
                    >
                      {item.meal.imageUrl ? (
                        <CloudinaryImage
                          imageNameOrUrl={item.meal.imageUrl}
                          width={500}
                          height={500}
                          className="h-[72px] w-[72px] rounded-xl object-cover"
                        />
                      ) : (
                        <NoImageMeal />
                      )}
                      <div className="w-full">
                        <div className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200">
                          {item.meal?.name}
                        </div>
                        <div>
                          <ul className="flex fle-row flex-wrap gap-1">
                            {ingredients
                              .sort(
                                (a, b) =>
                                  Number(b.ingredient?.available) -
                                  Number(a.ingredient?.available)
                              )
                              .slice(0, MAXCOUNT)
                              .map((comp) => (
                                <Badge
                                  key={comp.id}
                                  variant="outline"
                                  className={cn(
                                    "text-xs font-medium py-[3px] px-2",
                                    comp.ingredient?.available
                                      ? "text-yellow-700 bg-yellow-100 border border-yellow-200"
                                      : "text-neutral-500"
                                  )}
                                >
                                  {comp.ingredient?.name}
                                </Badge>
                              ))}

                            {ingredients.length > MAXCOUNT && (
                              <Badge
                                variant="outline"
                                className="text-xs font-medium text-neutral-500 py-[3px] px-2"
                              >
                                {`+ ${ingredients.length - MAXCOUNT}`}
                              </Badge>
                            )}
                          </ul>
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() => handleDeleteMeal(item.day)}
                      className="text-neutral-500 hover:text-orange-600 focus:text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
                    >
                      <Delete3Line width={16} height={16} />
                    </div>
                  </div>
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

export default SchedulePage;
