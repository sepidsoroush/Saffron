import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addIngredient } from "@/store/ingredients/ingredients.actions";
import { cn, uniqueId } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  CheckCircleLine,
  CheckCircleFill,
  AddCircleFill,
  CarrotFill,
} from "@/components/shared/icons";
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
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const handleCreateNewIngredient = () => {
    dispatch(
      addIngredient({
        id: uniqueId(),
        name: searchTerm,
        available: false,
        isImported: false,
        category: "Others",
      })
    );
    setSearchTerm("");
  };

  return (
    <Command>
      <CommandInput
        placeholder="Search Ingredients"
        className="px-3 py-[10px] w-full bg-neutral-100 caret-orange-500 text-neutral-900 text-base"
        value={searchTerm}
        onValueChange={setSearchTerm}
      />

      <CommandList ref={listRef} className="h-72 mt-2 pb-4">
        <CommandEmpty>
          <div className="flex flex-col gap-6">
            {searchTerm && (
              <button
                onClick={handleCreateNewIngredient}
                className="flex flex-row items-center text-neutral-600 text-[15px] font-medium"
              >
                <div className="text-orange-500 mr-1">
                  <AddCircleFill width={24} height={24} />
                </div>
                Create{" "}
                <span className="bg-neutral-200 rounded py-px px-0.5 text-neutral-600 text-[15px] font-medium ml-0.5">
                  {searchTerm}
                </span>
              </button>
            )}
            <div className="w-full flex flex-col justify-center items-center py-12 space-y-1.5">
              <div className="text-neutral-300">
                <CarrotFill width={32} height={32} />
              </div>
              <p className="text-xs text-neutral-500 font-medium">Not found</p>
            </div>
          </div>
        </CommandEmpty>
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
                    className="cursor-pointer pl-1 py-3 border-b border-dashed border-neutral-100 dark:border-neutral-800"
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
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
