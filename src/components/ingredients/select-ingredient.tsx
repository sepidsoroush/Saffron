import { useState } from "react";

import { IngredientList } from "./Ingredient-list";
import { SelectOption } from "@/types/common-ui";

interface Props {
  options: SelectOption[];
  onValueChange: (value: string[]) => void;
  defaultValue: string[];
}

export function SelectIngredientComboBox({
  options,
  onValueChange,
  defaultValue = [],
}: Props) {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  return (
    <IngredientList
      options={options}
      selectedValues={selectedValues}
      toggleOption={toggleOption}
    />
  );
}
