import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CloudinaryImage from "@/components/shared/cloudinary-image";
import { CheckIcon, Plus } from "lucide-react";
import { cn, groupMealsByCuisine } from "@/lib/utils";

import { Meal } from "@/types";

type Props = {
  options: Meal[];
  selectedValues: number[];
  onToggleOption: (value: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export default function OnboardingList({
  options,
  selectedValues,
  onToggleOption,
  onSelectAll,
  onDeselectAll,
  onSubmit,
  isLoading,
}: Props) {
  const [prevOptionsLength, setPrevOptionsLength] = useState<number>(
    options.length
  );
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const groupedMeals = groupMealsByCuisine(options);

  useEffect(() => {
    if (options.length > prevOptionsLength) {
      const newItem = options[options.length - 1];
      onToggleOption(newItem.id);
    }
    setPrevOptionsLength(options.length);
  }, [options, prevOptionsLength, onToggleOption]);

  const toggleCuisineSelection = (cuisine: string, meals: Meal[]) => {
    const allSelected = selectedCuisines.includes(cuisine);
    if (allSelected) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
      meals.forEach((meal) => onToggleOption(meal.id));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
      meals.forEach((meal) => onToggleOption(meal.id));
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <LoadingSpinner
            width={150}
            height={150}
            stroke="#059669"
            className="flex items-center place-content-center"
          />
        </div>
      )}
      <Command className={`${isLoading ? "blur-sm" : ""}`}>
        <CommandInput placeholder="Search Items..." />
        <CommandList className="border-b">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <Accordion type="single" collapsible>
              {Object.entries(groupedMeals).map(([cuisine, meals]) => {
                const isCuisineSelected =
                  selectedCuisines.includes(cuisine) ||
                  meals.some((meal) => selectedValues.includes(meal.id));

                return (
                  <AccordionItem key={cuisine} value={cuisine} className="px-3">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <Checkbox
                          checked={isCuisineSelected}
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isCuisineSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                          id={`cuisine-${cuisine}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCuisineSelection(cuisine, meals);
                          }}
                        />
                        <Label
                          htmlFor={`cuisine-${cuisine}`}
                          className="text-base font-light cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCuisineSelection(cuisine, meals);
                          }}
                        >
                          {cuisine}
                          <span className="pl-1 text-sm text-gray-500">
                            (
                            {
                              meals.filter((meal) =>
                                selectedValues.includes(meal.id)
                              ).length
                            }
                            )
                          </span>
                        </Label>
                      </div>
                      <AccordionTrigger className="pl-12"></AccordionTrigger>
                    </div>
                    <AccordionContent>
                      <div className="grid grid-cols-2 mt-2">
                        {meals.map((meal) => (
                          <CommandItem
                            key={meal.id}
                            onSelect={() => onToggleOption(meal.id)}
                            className="cursor-pointer flex flex-col items-start"
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-6 w-6 items-center justify-center rounded-full absolute right-4 top-4 z-10",
                                selectedValues.includes(meal.id)
                                  ? "bg-primary text-primary-foreground border border-primary"
                                  : "bg-white border border-white"
                              )}
                            >
                              {selectedValues.includes(meal.id) ? (
                                <CheckIcon className="h-4 w-4" />
                              ) : (
                                <Plus size={18} />
                              )}
                            </div>
                            <CloudinaryImage
                              imageNameOrUrl={meal.name}
                              width={500}
                              height={500}
                              className={cn(
                                "h-40 w-40 rounded-xl object-cover border border-gray-200",
                                selectedValues.includes(meal.id)
                                  ? ""
                                  : "opacity-70"
                              )}
                            />

                            <span className="font-medium">{meal.name}</span>
                          </CommandItem>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CommandGroup>
        </CommandList>
        <div className="grid grid-cols-2 my-2 mx-4">
          <div className="flex flex-row items-center justify-start">
            {selectedValues.length !== options.length ? (
              <CommandItem
                onSelect={onSelectAll}
                className="p-0 cursor-pointer"
                disabled={isLoading || selectedValues.length === options.length}
              >
                <Button variant="ghost">
                  Select All ({selectedValues.length})
                </Button>
              </CommandItem>
            ) : (
              <CommandItem
                onSelect={onDeselectAll}
                className="p-0 cursor-pointer"
                disabled={isLoading || selectedValues.length === 0}
              >
                <Button variant="ghost">
                  Deselect All ({selectedValues.length})
                </Button>
              </CommandItem>
            )}
          </div>
          <Button
            disabled={isLoading || selectedValues.length === 0}
            className="text-center"
            onClick={onSubmit}
          >
            Add
          </Button>
        </div>
      </Command>
    </div>
  );
}
