import { Schedule } from ".";
// export enum CuisineType {
//   Persian = "Persian",
//   Italian = "Italian",
//   Mexican = "Mexican",
//   American = "American",
//   Turkish = "Turkish",
//   Russian = "Russian",
//   Indian = "Indian",
//   Other = "Other",
// }

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
