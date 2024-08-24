import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectBulkIngredients } from "@/store/ingredients/ingredients.selector";
import { fetchBulkIngredients } from "@/store/ingredients/ingredients.actions";
import { addIngredient } from "@/store/ingredients/ingredients.actions";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { cn, ingredientDataAsSelectOptions, uniqueId } from "@/lib/utils";
import { SelectOption } from "@/types/common-ui";
import Docs from "/docs.svg";

// Main component for empty state and ingredient selection
export default function EmptyStateIngredients() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const bulkIngredients = useAppSelector(selectBulkIngredients);
  const ingredientSelectOptions: SelectOption[] =
    ingredientDataAsSelectOptions(bulkIngredients);

  useEffect(() => {
    if (bulkIngredients.length === 0) {
      dispatch(fetchBulkIngredients());
    }
  }, [bulkIngredients, dispatch]);

  const toggleOption = (value: string) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const selectAll = () => {
    setSelectedValues(ingredientSelectOptions.map((option) => option.value));
  };

  const deselectAll = () => setSelectedValues([]);

  const submitSelected = async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        selectedValues.map((value) => {
          const option = ingredientSelectOptions.find(
            (opt) => opt.value === value
          );
          if (!option) {
            throw new Error(`Ingredient with value ${value} not found.`);
          }

          return dispatch(
            addIngredient({
              id: uniqueId(),
              name: option.label,
              available: false,
              public_ingredient_id: Number(option.value),
            })
          );
        })
      );
    } catch (error) {
      console.error("Error adding ingredients:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <section className="h-[calc(100vh-160px)] w-full flex flex-col justify-center items-center">
      <img src={Docs} className="z-10" alt="Documentation" />
      <p className="text-[#4A4A4A] font-bold mb-2">No Ingredients</p>
      <p className="text-[#4A4A4A] font-light">
        Start creating your grocery shopping list
      </p>
      <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
        <DrawerTrigger asChild>
          <Button variant="link">Import Ingredients</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </DrawerTitle>
          <DrawerDescription>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </DrawerDescription>
          <div className="mt-4 border-t">
            <IngredientList
              options={ingredientSelectOptions}
              selectedValues={selectedValues}
              onToggleOption={toggleOption}
              onSelectAll={selectAll}
              onDeselectAll={deselectAll}
              onSubmit={submitSelected}
              isLoading={isLoading}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
}

// Props interface for IngredientList component
interface IngredientListProps {
  options: SelectOption[];
  selectedValues: string[];
  onToggleOption: (value: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

// Component for displaying and managing ingredient selection
function IngredientList({
  options,
  selectedValues,
  onToggleOption,
  onSelectAll,
  onDeselectAll,
  onSubmit,
  isLoading,
}: IngredientListProps) {
  const [prevOptionsLength, setPrevOptionsLength] = useState<number>(
    options.length
  );

  useEffect(() => {
    if (options.length > prevOptionsLength) {
      const newIngredient = options[options.length - 1];
      onToggleOption(newIngredient.value);
    }
    setPrevOptionsLength(options.length);
  }, [options, prevOptionsLength, onToggleOption]);

  return (
    <Command>
      <CommandInput placeholder="Search Ingredient..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <div key={option.value}>
              <CommandItem
                onSelect={() => onToggleOption(option.value)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedValues.includes(option.value)
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                <span>{option.label}</span>
              </CommandItem>
            </div>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="flex flex-row justify-center items-center">
        <CommandItem
          onSelect={onSelectAll}
          className="p-0 cursor-pointer"
          disabled={selectedValues.length === options.length}
        >
          <Button variant="ghost">Select All</Button>
        </CommandItem>
        <CommandItem
          onSelect={onDeselectAll}
          className="p-0 cursor-pointer"
          disabled={selectedValues.length === 0}
        >
          <Button variant="ghost">Deselect All</Button>
        </CommandItem>
        <CommandItem
          onSelect={onSubmit}
          className="p-0 cursor-pointer"
          disabled={selectedValues.length === 0}
        >
          <Button variant="ghost" className="text-emerald-600 font-semibold">
            {isLoading ? "Adding..." : "Done"}
          </Button>
        </CommandItem>
      </div>
    </Command>
  );
}
