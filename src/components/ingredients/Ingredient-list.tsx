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
import { CheckCircleLine, CheckCircleFill } from "../shared/icons";
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

  return (
    <Command>
      <CommandInput
        placeholder="Search Ingredients"
        className="px-3 py-[10px] w-full bg-neutral-100 caret-orange-500 text-neutral-900 text-base"
      />

      <CommandList ref={listRef}>
        <CommandEmpty>Not found</CommandEmpty>
        <CommandGroup>
          <div className="divide-y divide-dashed divide-neutral-100 dark:divide-neutral-800">
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
                      className="cursor-pointer pl-1 py-3"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-5 w-5 items-center justify-center rounded-full",
                          isSelected
                            ? "text-orange-500"
                            : "border-2 border-neutral-300 [&_svg]:invisible"
                        )}
                      >
                        {isSelected ? (
                          <CheckCircleFill width={20} height={20} />
                        ) : (
                          <CheckCircleLine width={20} height={20} />
                        )}
                      </div>
                      <div className="ml-1.5 text-[15px] font-medium text-neutral-600 dark:text-neutral-400">
                        {option.label}
                      </div>
                    </CommandItem>
                  </motion.div>
                );
              })}
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
