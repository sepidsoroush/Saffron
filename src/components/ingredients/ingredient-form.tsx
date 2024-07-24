import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIngredients } from "@/store/ingredients/ingredients.selector";
import { selectGroceries } from "@/store/groceries/groceries.selector";
import {
  updateIngredient,
  addIngredient,
} from "@/store/ingredients/ingredients.actions";
import { updateGrocery, addGrocery } from "@/store/groceries/groceries.actions";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Ingredient, Grocery } from "@/types";
import { showErrorToast } from "@/lib/utils";

type Props = {
  ingredient?: Ingredient | Grocery;
  type: "update" | "create";
  onFinish?: () => void;
  category: "ingredient" | "grocery";
};

const IngredientForm = ({ ingredient, type, onFinish, category }: Props) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(type === "create");
  const [updatedName, setUpdatedName] = useState(ingredient?.name || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const ingredientsData = useAppSelector(selectIngredients);
  const groceriesData = useAppSelector(selectGroceries);

  const data = category === "ingredient" ? ingredientsData : groceriesData;

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

    if (type === "update" && ingredient && trimmedName === ingredient.name) {
      if (onFinish) {
        onFinish();
      }
      return;
    }

    const itemExists = data.some(
      (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (itemExists) {
      showErrorToast(
        `${
          category.charAt(0).toUpperCase() + category.slice(1)
        } with this name already exists. Please choose a different name.`
      );
      setIsEditing(true);

      return;
    }

    if (type === "update" && ingredient) {
      if (trimmedName !== ingredient.name) {
        const action =
          category === "ingredient"
            ? updateIngredient(ingredient.id, {
                ...ingredient,
                name: trimmedName,
              })
            : updateGrocery(ingredient.id, {
                ...ingredient,
                name: trimmedName,
              });

        dispatch(action);
      }
    } else {
      const newItem = {
        id: Math.floor(Math.random() * Math.pow(2, 20)),
        name: trimmedName,
        available: false,
      };
      const action =
        category === "ingredient"
          ? addIngredient(newItem)
          : addGrocery(newItem);

      dispatch(action);
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
      const action =
        category === "ingredient"
          ? updateIngredient(ingredient.id, {
              ...ingredient,
              available: !ingredient.available,
            })
          : updateGrocery(ingredient.id, {
              ...ingredient,
              available: !ingredient.available,
            });

      dispatch(action);
    }
  };

  return (
    <li className="flex items-center space-x-2">
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
