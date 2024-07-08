export interface Food {
  id: string;
  name: string;
  ingredients?: Ingredient[];
  lastCooked?: Date;
  type?: MealType;
}

export interface Ingredient {
  id: string;
  name: string;
  category?: string;
  available: boolean;
  status?: string;
}

export enum MealType {
  Persian,
  Italian,
  Mexican,
  American,
  Turkish,
  Russian,
  Indian,
  Healthy,
  Special,
}
