import { CuisineType, MealType, WeekDay } from "./constants";

export interface Meal {
  id: number;
  name: string;
  cuisine?: CuisineType;
  type?: MealType;
}

export interface Ingredient {
  id: number;
  name: string;
  available: boolean;
}

export interface Schedule {
  id?: number;
  day_id: number;
  day: WeekDay;
  meal_id?: number;
  meal?: Meal;
}

export interface Composition {
  id: number;
  meal_id: number;
  ingredient_id: number;
}

export interface Grocery {
  id: number;
  name: string;
  available: boolean;
}
