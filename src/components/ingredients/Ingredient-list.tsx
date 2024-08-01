import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import NewItem from "@/components/shared/new-Item";
import IngredientForm from "./ingredient-form";
import { CheckIcon } from "lucide-react";

import { SelectOption } from "@/types/common-ui";

type Props = {
  options: SelectOption[];
  selectedValues: string[];
  toggleOption: (value: string) => void;
};

export function IngredientList({
  options,
  selectedValues,
  toggleOption,
}: Props) {
  const [isCreating, setIsCreating] = useState(false);

  const newItemHandler = () => {
    setIsCreating(true);
  };

  const finishCreatingHandler = () => {
    setIsCreating(false);
  };
  return (
    <Command>
      <CommandInput placeholder="Search Ingredient..." />
      <CommandItem className="border-b">
        {isCreating ? (
          <IngredientForm
            type="create"
            onFinish={finishCreatingHandler}
            category="ingredient"
          />
        ) : (
          <NewItem onClick={newItemHandler} title="New Item" />
        )}
      </CommandItem>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup>
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <CommandItem
                key={option.value}
                onSelect={() => toggleOption(option.value)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                <span>{option.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
