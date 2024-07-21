import { useState } from "react";
import { ChevronDown, XIcon, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IngredientList } from "./Ingredient-list";
import { SelectOption } from "@/types/common-ui";

interface Props {
  options: SelectOption[];
  onValueChange: (value: string[]) => void;
  defaultValue: string[];
  placeholder?: string;
  maxCount?: number;
  className?: string;
}

export function SelectIngredientComboBox({
  options,
  onValueChange,
  defaultValue = [],
  placeholder = "Select options",
  maxCount = 3,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const renderButtonContent = () =>
    selectedValues.length > 0 ? (
      <div className="flex justify-between items-center w-full ">
        <div className="flex flex-wrap items-center">
          {selectedValues.slice(0, maxCount).map((value) => {
            const option = options.find((o) => o.value === value);
            return (
              <Badge
                key={value}
                className="m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                {option?.label}
                <XCircle
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleOption(value);
                  }}
                />
              </Badge>
            );
          })}
          {selectedValues.length > maxCount && (
            <Badge className="bg-transparent text-foreground border-foreground/1 hover:bg-transparent">
              {`+ ${selectedValues.length - maxCount} more`}
              <XCircle
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  clearExtraOptions();
                }}
              />
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between ">
          <XIcon
            className="h-4 mx-2 cursor-pointer text-muted-foreground"
            onClick={(event) => {
              event.stopPropagation();
              handleClear();
            }}
          />
          <Separator orientation="vertical" className="flex min-h-6 h-full" />
          <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-between w-full mx-auto">
        <span className="text-sm text-muted-foreground mx-3">
          {placeholder}
        </span>
        <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
      </div>
    );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start", className)}
          >
            {renderButtonContent()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <IngredientList
            options={options}
            selectedValues={selectedValues}
            toggleOption={toggleOption}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start h-max", className)}
        >
          {renderButtonContent()}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <IngredientList
            options={options}
            selectedValues={selectedValues}
            toggleOption={toggleOption}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
