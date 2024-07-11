import { useState, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateIngredient } from "@/store/ingredients-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Ingredient } from "@/types";

type Props = {
  ingredient: Ingredient;
};

export const IngredientItem = ({ ingredient }: Props) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(ingredient.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const finishEditing = () => {
    setIsEditing(false);
    if (updatedName.trim() !== "" && updatedName !== ingredient.name) {
      dispatch(
        updateIngredient(ingredient.id, {
          ...ingredient,
          name: updatedName.trim(),
        })
      );
    } else {
      setUpdatedName(ingredient.name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      finishEditing();
    } else if (e.key === "Escape") {
      setUpdatedName(ingredient.name);
      setIsEditing(false);
    }
  };

  const handleLabelClick = () => {
    if (!isEditing) {
      startEditing();
    }
  };

  const checkboxHandler = () => {
    dispatch(
      updateIngredient(ingredient.id, {
        ...ingredient,
        available: !ingredient.available,
      })
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={ingredient.available}
        className={
          ingredient.available
            ? "data-[state=checked]:bg-gray-300 data-[state=checked]:border-gray-300"
            : ""
        }
        onClick={checkboxHandler}
      />

      {isEditing ? (
        <Input
          type="text"
          value={updatedName}
          onChange={handleInputChange}
          onBlur={finishEditing}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      ) : (
        <p
          className={
            ingredient.available ? "text-gray-400 line-through font-normal" : ""
          }
          onClick={handleLabelClick}
        >
          {ingredient.name}
        </p>
      )}
    </div>
  );
};
