import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteIngredient } from "@/store/ingredients/ingredients.actions";
import { deleteComposition } from "@/store/compositions/compositions.actions";
import { selectCompositions } from "@/store/compositions/compositions.selector";

import { Delete3Line } from "@/components/shared/icons";
import IngredientForm from "./ingredient-form";

import { Ingredient } from "@/types";
import { cn, showErrorToast, showSuccessToast } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  item: Ingredient;
};

export const IngredientItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const compositionsData = useAppSelector(selectCompositions);

  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  const itemRef = useRef<HTMLDivElement>(null);

  const resetItem = useCallback(() => {
    setActive(false);
  }, []);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const startX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(startX);
    setDragging(true);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;

    if (dragStartX - currentX > 50) {
      setActive(true);
    } else if (currentX - dragStartX > 50) {
      setActive(false);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    if (!active) {
      resetItem();
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        resetItem();
      }
    },
    [resetItem]
  );

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetItem();
      }
    },
    [resetItem]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleClickOutside, handleEscapeKey]);

  const deleteHandler = async () => {
    try {
      const compositionsToDelete = compositionsData.filter(
        (c) => c.ingredient_id === item.id
      );
      // Delete all related compositions
      const deleteCompositionPromises = compositionsToDelete.map((c) =>
        dispatch(deleteComposition(c.id))
      );
      await Promise.all(deleteCompositionPromises);
      // Delete the ingredient
      await dispatch(deleteIngredient(item.id));
      showSuccessToast("Ingredient in all recipes deleted!");
    } catch (error) {
      showErrorToast(
        `${`Error deleting ingredient and compositions: ${error}`}`
      );
    }
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      ref={itemRef}
      className="relative overflow-hidden flex flex-row items-center justify-between"
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div
        className={cn(
          "relative transition-colors duration-400 ease-in-out w-full",
          {
            "text-neutral-400": active,
            "text-neutral-600": !active,
          }
        )}
      >
        <IngredientForm type="update" ingredient={item} />
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <button
            className="text-orange-600 bg-neutral-100 rounded-full w-6 h-6 flex items-center place-content-center shadow-inner"
            onClick={deleteHandler}
          >
            <Delete3Line width={16} height={16} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
