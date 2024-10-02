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
import { CheckIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Meal, Ingredient } from "@/types";

type Props = {
  options: Meal[] | Ingredient[];
  selectedValues: number[];
  onToggleOption: (value: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onSubmit: () => void;
};

export default function OnboardingList({
  options,
  selectedValues,
  onToggleOption,
  onSelectAll,
  onDeselectAll,
  onSubmit,
}: Props) {
  const [prevOptionsLength, setPrevOptionsLength] = useState<number>(
    options.length
  );

  useEffect(() => {
    if (options.length > prevOptionsLength) {
      const newItem = options[options.length - 1];
      onToggleOption(newItem.id);
    }
    setPrevOptionsLength(options.length);
  }, [options, prevOptionsLength, onToggleOption]);

  // Helper to check if the options are of type Meal
  const isMeal = (option: Meal | Ingredient): option is Meal => {
    return "imageUrl" in option;
  };

  return (
    <Command>
      <CommandInput placeholder="Search Items..." />

      <CommandList className="border-b">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {isMeal(options[0]) ? (
            <div className="grid grid-cols-2">
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => onToggleOption(option.id)}
                  className="cursor-pointer flex flex-col items-start"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-6 w-6 items-center justify-center rounded-full absolute right-4 top-4",
                      selectedValues.includes(option.id)
                        ? "bg-primary text-primary-foreground border border-primary"
                        : "bg-white border border-white"
                    )}
                  >
                    {selectedValues.includes(option.id) ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                  {isMeal(option) && (
                    <img
                      src={option.imageUrl}
                      alt={option.name}
                      className="h-40 w-40 rounded-xl object-cover border border-gray-200"
                    />
                  )}
                  <span className="font-medium">{option.name}</span>
                </CommandItem>
              ))}
            </div>
          ) : (
            options.map((option) => (
              <div key={option.id}>
                <CommandItem
                  onSelect={() => onToggleOption(option.id)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.includes(option.id)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>{option.name}</span>
                </CommandItem>
              </div>
            ))
          )}
        </CommandGroup>
      </CommandList>
      <div className="flex flex-row justify-between items-center my-2 mx-4">
        <div className="flex flex-row items-center justify-start">
          {selectedValues.length !== options.length ? (
            <CommandItem
              onSelect={onSelectAll}
              className="p-0 cursor-pointer"
              disabled={selectedValues.length === options.length}
            >
              <Button variant="ghost">
                Select All ({selectedValues.length})
              </Button>
            </CommandItem>
          ) : (
            <CommandItem
              onSelect={onDeselectAll}
              className="p-0 cursor-pointer"
              disabled={selectedValues.length === 0}
            >
              <Button variant="ghost">
                Deselect All ({selectedValues.length})
              </Button>
            </CommandItem>
          )}
        </div>
        <Button
          disabled={selectedValues.length === 0}
          className="text-center w-1/4"
          onClick={onSubmit}
        >
          Add
        </Button>
      </div>
    </Command>
  );
}
