import { useState, useEffect, useRef } from "react";
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
import { motion } from "framer-motion";

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
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [prevOptionsLength, setPrevOptionsLength] = useState<number>(
    options.length
  );
  const [scrollTop, setScrollTop] = useState<number>(0);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.length > prevOptionsLength) {
      const newIngredient = options[options.length - 1];
      toggleOption(newIngredient.value);
    }
    setPrevOptionsLength(options.length);
  }, [options, prevOptionsLength, toggleOption]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop, options, selectedValues]);

  const handleToggleOption = (value: string) => {
    if (listRef.current) {
      setScrollTop(listRef.current.scrollTop);
    }
    toggleOption(value);
  };

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
          <IngredientForm type="create" onFinish={finishCreatingHandler} />
        ) : (
          <NewItem onClick={newItemHandler} title="New Item" />
        )}
      </CommandItem>
      <CommandList ref={listRef}>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options
            .sort((a, b) => {
              const aSelected = selectedValues.includes(a.value);
              const bSelected = selectedValues.includes(b.value);
              return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
            })
            .map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <motion.div
                  key={option.value}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <CommandItem
                    onSelect={() => handleToggleOption(option.value)}
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
                </motion.div>
              );
            })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
