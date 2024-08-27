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
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types/common-ui";

type Props = {
  options: SelectOption[];
  selectedValues: string[];
  onToggleOption: (value: string) => void;
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
      onToggleOption(newItem.value);
    }
    setPrevOptionsLength(options.length);
  }, [options, prevOptionsLength, onToggleOption]);

  return (
    <Command>
      <CommandInput placeholder="Search Items..." />
      <CommandList className="border-b">
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
      <div className="grid grid-cols-3 items-center border-b">
        {selectedValues.length !== options.length ? (
          <CommandItem
            onSelect={onSelectAll}
            className="p-0 cursor-pointer"
            disabled={selectedValues.length === options.length}
          >
            <Button variant="ghost">Select All</Button>
          </CommandItem>
        ) : (
          <CommandItem
            onSelect={onDeselectAll}
            className="p-0 cursor-pointer"
            disabled={selectedValues.length === 0}
          >
            <Button variant="ghost">Deselect All</Button>
          </CommandItem>
        )}
        <Button className="text-center" onClick={onSubmit}>
          import
        </Button>
        <div className="pr-2 text-sm text-gray-700 text-right">
          {selectedValues.length} selected
        </div>
      </div>
    </Command>
  );
}
