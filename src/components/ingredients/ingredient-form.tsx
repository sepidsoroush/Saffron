import * as React from "react";
import { useState, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateIngredient, addIngredient } from "@/store/ingredients-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Ingredient } from "@/types";

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
          id: Math.floor(Math.random() * Math.pow(2, 20)),
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
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={ingredient?.available || false}
        className={
          ingredient?.available
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
            ingredient?.available
              ? "text-gray-400 line-through font-normal"
              : ""
          }
          onClick={handleLabelClick}
        >
          {ingredient?.name}
        </p>
      )}
    </div>
  );
};

export default IngredientForm;
