import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MealsTab from "./tabs/Meals";
import GroceryTab from "./tabs/Grocery";
import WeeklyPlanTab from "./tabs/WeeklyPlan";

export function App() {
  return (
    <Tabs defaultValue="weeklyplan" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weeklyplan">Weekly Plan</TabsTrigger>
        <TabsTrigger value="meals">Meals</TabsTrigger>
        <TabsTrigger value="grocery">Grocery</TabsTrigger>
      </TabsList>
      <TabsContent value="weeklyplan">
        <WeeklyPlanTab />
      </TabsContent>
      <TabsContent value="meals">
        <MealsTab />
      </TabsContent>
      <TabsContent value="grocery">
        <GroceryTab />
      </TabsContent>
    </Tabs>
  );
}
