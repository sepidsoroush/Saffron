import { Schedule } from ".";

export enum CuisineType {
  MiddleEastern = "Middle Eastern",
  Italian = "Italian",
  Mexican = "Mexican",
  Asian = "Asian",
  Healthy = "Healthy Food",
}

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
  { id: 1, name: CuisineType.Asian, emoji: "🍜" },
  { id: 2, name: CuisineType.Healthy, emoji: "🥗" },
  { id: 3, name: CuisineType.Italian, emoji: "🍝" },
  { id: 4, name: CuisineType.Mexican, emoji: "🌮" },
  { id: 5, name: CuisineType.MiddleEastern, emoji: "🍢" },
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
