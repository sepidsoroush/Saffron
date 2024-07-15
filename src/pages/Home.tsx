import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import MealsTab from "@/tabs/Meals";
import GroceryTab from "@/tabs/Grocery";
import WeeklyPlanTab from "@/tabs/weekly-plan/page";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeals } from "@/store/meals-actions";
import { fetchIngredients } from "@/store/ingredients-actions";
// import { fetchSchedule } from "@/store/schedule-actions";

import { Meal, Ingredient } from "@/types";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchIngredients());
    // dispatch(fetchSchedule());
  }, [dispatch]);

  const meals = useAppSelector<Meal[]>((state) => state.meals.meals);
  const ingredients = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );

  return (
    <Tabs defaultValue="weeklyplan" className="w-full">
      <TabsList className="grid w-full grid-cols-3 fixed top-0">
        <TabsTrigger value="weeklyplan">Weekly Plan</TabsTrigger>
        <TabsTrigger value="meals">Meals</TabsTrigger>
        <TabsTrigger value="grocery">Grocery</TabsTrigger>
      </TabsList>
      <Card className="mt-10 mx-2">
        <TabsContent value="weeklyplan">
          <WeeklyPlanTab />
        </TabsContent>
        <TabsContent value="meals">
          <MealsTab meals={meals} />
        </TabsContent>
        <TabsContent value="grocery">
          <GroceryTab ingredients={ingredients} />
        </TabsContent>
      </Card>
    </Tabs>
  );
}
