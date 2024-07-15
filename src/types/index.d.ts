import { CuisineType, MealType, WeekDay } from "./constants";

export interface Meal {
  id: number;
  name: string;
  // ingredients: Ingredient[];
  // lastCooked?: Date;
  cuisine?: CuisineType;
  type?: MealType;
}

export interface Ingredient {
  id: number;
  name: string;
  // category?: string;
  available: boolean;
  // status?: string;
}

export interface Schedule {
  id: number;
  day: WeekDay;
  meal_id: number;
}

export interface compositions {
  id: number;
  meal_id: number;
  ingredient_id: number;
}
