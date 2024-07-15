import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Ingredient } from "@/types";
import { Category, SelectOption } from "@/types/common-ui";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const categoryAsSelectionOptions = (data: Category[]): SelectOption[] => {
  const categorySelectionOptions = data.map((record) => {
    return { value: `${record.id}`, label: record.name };
  });
  return categorySelectionOptions;
};

export const ingredientDataAsSelectOptions = (
  data: Ingredient[]
): SelectOption[] => {
  return categoryAsSelectionOptions(data);
};
