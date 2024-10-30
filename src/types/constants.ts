import { Description } from "@radix-ui/react-toast";
import { Schedule } from ".";

// export enum MealType {
//   Breakfast = "Breakfast",
//   Lunch = "Lunch",
//   Dinner = "Dinner",
//   Snack = "Snack",
// }

export enum WeekDay {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export const emptySchedule: Schedule[] = [
  { day_id: 1, day: WeekDay.Monday, meal_id: undefined },
  { day_id: 2, day: WeekDay.Tuesday, meal_id: undefined },
  { day_id: 3, day: WeekDay.Wednesday, meal_id: undefined },
  { day_id: 4, day: WeekDay.Thursday, meal_id: undefined },
  { day_id: 5, day: WeekDay.Friday, meal_id: undefined },
  { day_id: 6, day: WeekDay.Saturday, meal_id: undefined },
  { day_id: 7, day: WeekDay.Sunday, meal_id: undefined },
];

export const cuisineInfo = [
  {
    id: 1,
    name: "Iranian",
    description: "Rich spices and warmth",
  },
  {
    id: 2,
    name: "Indian",
    description: "Bold flavors in every bite!",
  },
  {
    id: 3,
    name: "Italian",
    description: "Comforting dishes with love",
  },
  { id: 4, name: "Mexican", description: "Spicy delights" },
];

export enum CategoryType {
  Produce = "Vegetables & Fruits",
  Meat = "Meat, Chicken & Seafood",
  Dairy = "Dairy, Eggs & Cheese",
  Oils = "Oils, Sauces & Condiments",
  Bakery = "Breads, Cakes & Cereals",
  Beverage = "Coffee, Wine & Spirits",
  Spices = "Spices, Seasonings & Baking Items",
  Grains = "Pasta, Rice & Grains",
  Canned = "Canned Foods & Soups",
  Frozen = "Frozen Foods",
  Snacks = "Snacks & Candy",
  Household = "Household Items",
  Personal = "Personal Care & Health",
  Other = "Others",
}
