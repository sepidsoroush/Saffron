import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Ingredient, Meal } from "@/types";
import { SelectOption } from "@/types/common-ui";

import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ingredientDataAsSelectOptions = (
  data: Ingredient[]
): SelectOption[] => {
  const categorySelectionOptions = data.map((record) => {
    return {
      value: `${record.id}`,
      label: record.name,
      category: record.category,
    };
  });
  return categorySelectionOptions;
};

export const groupMealsByCuisine = (meals: Meal[]) => {
  return meals.reduce((acc, meal) => {
    const cuisine = meal.cuisine ?? "Other";
    acc[cuisine] = acc[cuisine] || [];
    acc[cuisine].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);
};

export const showSuccessToast = (message: string) => {
  toast({
    variant: "default",
    title: "Success!",
    description: message,
  });
};

export const showErrorToast = (message: string) => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: message,
  });
};

export function uniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNumber = Math.floor(Math.random() * 1000); // Generate a small random number
  const uniqueId = Number(timestamp * 1000 + randomNumber); // Combine timestamp and random number

  return uniqueId;
}
