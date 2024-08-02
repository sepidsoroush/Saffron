// import { CuisineType, MealType } from "./constants";
import { WeekDay } from "./constants";

export interface Meal {
  id: number;
  name: string;
  imageUrl?: string;
  // cuisine?: CuisineType;
  // type?: MealType;
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
