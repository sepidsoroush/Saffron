export interface Meal {
  id: string;
  name: string;
  ingredients: Ingredient[];
  // lastCooked?: Date;
  cuisine?: CuisineType;
  type?: MealType;
}

export interface Ingredient {
  id: string;
  name: string;
  // category?: string;
  available: boolean;
  // status?: string;
}

export enum CuisineType {
  Persian = "Persian",
  Italian = "Italian",
  Mexican = "Mexican",
  American = "American",
  Turkish = "Turkish",
  Russian = "Russian",
  Indian = "Indian",
  Other = "Other",
}

export enum MealType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Snack = "Snack",
}

export interface WeeklyPlan {
  id: number;
  day: string;
  meal: string;
}
