import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
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

interface Props {
  ingredient?: Ingredient;
  type: "update" | "create";
  onFinish?: () => void;
}

const IngredientForm = ({ ingredient, type, onFinish }: Props) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(type === "create");
  const [updatedName, setUpdatedName] = useState(ingredient?.name || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const ingredientsData = useAppSelector(selectIngredients);

  useEffect(() => {
    if (type === "create" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type]);

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
          isImported: false,
          category: "Others",
        })
      );
      setUpdatedName("");
      if (onFinish) {
        onFinish();
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    <li className="flex items-center space-x-1.5 w-full pl-1 py-1.5">
      <Checkbox
        checked={ingredient?.available || false}
        className={
          ingredient?.available
            ? "data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            : "border-2 border-neutral-300"
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
          className={ingredient?.available ? "text-neutral-400" : ""}
          onClick={handleLabelClick}
        >
          {ingredient?.name}
        </p>
      )}
    </li>
  );
};
export default IngredientForm;
