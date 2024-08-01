import * as React from "react";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIngredients } from "@/store/ingredients/ingredients.selector";
import {
  updateIngredient,
  addIngredient,
} from "@/store/ingredients/ingredients.actions";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Ingredient } from "@/types";
import { showErrorToast, uniqueId } from "@/lib/utils";

interface IngredientFormProps {
  ingredient?: Ingredient;
  type: "update" | "create";
  onFinish?: () => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  ingredient,
  type,
  onFinish,
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(type === "create");
  const [updatedName, setUpdatedName] = useState(ingredient?.name || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const ingredientsData = useAppSelector(selectIngredients);

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
    const trimmedName = updatedName.trim();
    if (trimmedName === "") {
      if (type === "create" && onFinish) {
        onFinish();
      }
      return;
    }

    // Check if the updated name is the same as the current name
    if (type === "update" && ingredient && trimmedName === ingredient.name) {
      if (onFinish) {
        onFinish();
      }
      return;
    }

    // Check if ingredient name already exists
    const ingredientExists = ingredientsData.some(
      (ing) => ing.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (ingredientExists) {
      showErrorToast(
        "Ingredient with this name already exists. Please choose a different name."
      );
      setIsEditing(true);

      return;
    }

    if (type === "update" && ingredient) {
      if (trimmedName !== ingredient.name) {
        dispatch(
          updateIngredient(ingredient.id, {
            ...ingredient,
            name: trimmedName,
          })
        );
      }
    } else {
      dispatch(
        addIngredient({
          id: uniqueId(),
          name: trimmedName,
          available: false,
        })
      );
      setUpdatedName("");
      if (onFinish) {
        onFinish();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      finishEditing();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setUpdatedName(ingredient?.name || "");
      if (type === "create" && onFinish) {
        onFinish();
      }
    }
  };
  const handleLabelClick = () => {
    if (!isEditing) {
      startEditing();
    }
  };

  const checkboxHandler = () => {
    if (type === "update" && ingredient) {
      dispatch(
        updateIngredient(ingredient.id, {
          ...ingredient,
          available: !ingredient.available,
        })
      );
    }
  };

  return (
    <li className="flex items-center space-x-2 w-full">
      <Checkbox
        checked={ingredient?.available || false}
        className={
          ingredient?.available
            ? "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
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
          className={ingredient?.available ? "text-gray-400 font-normal" : ""}
          onClick={handleLabelClick}
        >
          {ingredient?.name}
        </p>
      )}
    </li>
  );
};
export default IngredientForm;
