import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import MealsTab from "@/tabs/Meals";
import GroceryTab from "@/tabs/Grocery";
import ScheduleTab from "@/tabs/Schedule";

import { useAppDispatch } from "@/store/hooks";
import { fetchMeals } from "@/store/actions/meals-actions";
import { fetchIngredients } from "@/store/actions/ingredients-actions";
import { fetchSchedule } from "@/store/actions/schedule-actions";
import { fetchCompositions } from "@/store/actions/compositions-actions";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchIngredients());
    dispatch(fetchSchedule());
    dispatch(fetchCompositions());
  }, [dispatch]);

  return (
    <Tabs defaultValue="weeklyplan" className="w-full">
      <TabsList className="grid w-full grid-cols-3 fixed top-0">
        <TabsTrigger value="weeklyplan">Weekly Plan</TabsTrigger>
        <TabsTrigger value="meals">Meals</TabsTrigger>
        <TabsTrigger value="grocery">Grocery</TabsTrigger>
      </TabsList>
      <Card className="mt-10 mx-2">
        <TabsContent value="weeklyplan">
          <ScheduleTab />
        </TabsContent>
        <TabsContent value="meals">
          <MealsTab />
        </TabsContent>
        <TabsContent value="grocery">
          <GroceryTab />
        </TabsContent>
      </Card>
    </Tabs>
  );
}
