import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Ingredient } from "@/types";
import { Category, SelectOption } from "@/types/common-ui";

import { toast } from "@/components/ui/use-toast";

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
