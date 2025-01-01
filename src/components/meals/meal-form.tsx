import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SelectIngredientComboBox } from "@/components/ingredients/select-ingredient";

import { Meal, Composition } from "@/types";
import { SelectOption } from "@/types/common-ui";

import { ingredientDataAsSelectOptions } from "@/lib/utils";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addMeal, updateMeal } from "@/store/meals/meals.actions";

import {
  addComposition,
  updateComposition,
  deleteComposition,
} from "@/store/compositions/compositions.actions";
import { selectIngredients } from "@/store/ingredients/ingredients.selector";
import { selectMeals } from "@/store/meals/meals.selector";
import { selectCompositions } from "@/store/compositions/compositions.selector";

import { showErrorToast, showSuccessToast, uniqueId } from "@/lib/utils";
import MealImage from "./meal-image";

type ActionType = "create" | "update";

type Props = {
  actionType: ActionType;
  mealToUpdate?: Meal;
  setOpen: (open: boolean) => void;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(250, {
      message: "Name must not be longer than 250 characters.",
    }),
  ingredients: z.array(z.string()),
  imageUrl: z.string().optional(),
  // cuisine: z.string().optional(),
});

const MealForm = ({ actionType, mealToUpdate, setOpen }: Props) => {
  const dispatch = useAppDispatch();

  const ingredientsData = useAppSelector(selectIngredients);
  const compositionsData = useAppSelector(selectCompositions);
  const mealsData = useAppSelector(selectMeals);

  const ingredientSelectOptions: SelectOption[] =
    ingredientDataAsSelectOptions(ingredientsData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mealToUpdate ? mealToUpdate.name : "",
      ingredients: mealToUpdate
        ? compositionsData
            .filter((item) => item.meal_id === mealToUpdate.id)
            .map((item) => item.ingredient_id.toString())
        : [],
      imageUrl: mealToUpdate ? mealToUpdate.imageUrl : "",
      // cuisine: mealToUpdate ? mealToUpdate.cuisine : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const meal: Meal = {
      id: mealToUpdate ? mealToUpdate.id : uniqueId(),
      name: values.name,
      imageUrl: values.imageUrl,
      liked: false,
      // cuisine: values.cuisine,
    };

    // Check if the updated name is the same as the current name
    if (
      actionType === "update" &&
      mealToUpdate &&
      values.name === mealToUpdate.name
    ) {
      // Proceed with the update logic without checking for duplicate names
      dispatch(updateMeal(meal.id, meal)).then(() => {
        // Fetch existing compositions for the meal
        const existingCompositions = compositionsData.filter(
          (composition) => composition.meal_id === meal.id
        );

        // Determine which compositions to add, update, or delete
        const newIngredients = values.ingredients.map(Number);
        const existingIngredientIds = existingCompositions.map(
          (c) => c.ingredient_id
        );

        // Add new compositions
        const addPromises = newIngredients.map((ingredientId) => {
          if (!existingIngredientIds.includes(ingredientId)) {
            const composition: Composition = {
              id: uniqueId(),
              meal_id: meal.id,
              ingredient_id: ingredientId,
            };
            return dispatch(addComposition(composition));
          }
        });

        // Remove old compositions
        const deletePromises = existingCompositions.map((composition) => {
          if (!newIngredients.includes(composition.ingredient_id)) {
            return dispatch(deleteComposition(composition.id));
          }
        });

        // Update existing compositions if necessary
        const updatePromises = existingCompositions.map((composition) => {
          if (
            newIngredients.includes(composition.ingredient_id) &&
            composition.meal_id === meal.id
          ) {
            const updatedComposition: Composition = {
              ...composition,
              ingredient_id: composition.ingredient_id,
            };
            return dispatch(
              updateComposition(composition.id, updatedComposition)
            );
          }
        });

        Promise.all([...addPromises, ...deletePromises, ...updatePromises])
          .then(() => {
            showSuccessToast("Selected meal updated successfully");
          })
          .catch((error) => {
            showErrorToast(`${`Error updating selected meal: ${error}`}`);
          });
      });
      setOpen(false);
      return;
    }

    const mealExists = mealsData.some((m) => m.name === meal.name);

    if (mealExists) {
      form.setError("name", {
        type: "manual",
        message:
          "Meal with this name already exists. Please choose a different name.",
      });
      return;
    }

    if (actionType === "create") {
      dispatch(addMeal(meal)).then(() => {
        const compositionPromises = values.ingredients.map((ingredientId) => {
          const composition: Composition = {
            id: uniqueId(),
            meal_id: meal.id,
            ingredient_id: Number(ingredientId),
          };
          return dispatch(addComposition(composition));
        });

        Promise.all(compositionPromises)
          .then(() => {
            showSuccessToast("New meal added successfully");
          })
          .catch((error) => {
            showErrorToast(`${`Error adding new meal: ${error}`}`);
          });
      });
    } else if (actionType === "update") {
      dispatch(updateMeal(meal.id, meal)).then(() => {
        // Fetch existing compositions for the meal
        const existingCompositions = compositionsData.filter(
          (composition) => composition.meal_id === meal.id
        );

        // Determine which compositions to add, update, or delete
        const newIngredients = values.ingredients.map(Number);
        const existingIngredientIds = existingCompositions.map(
          (c) => c.ingredient_id
        );

        // Add new compositions
        const addPromises = newIngredients.map((ingredientId) => {
          if (!existingIngredientIds.includes(ingredientId)) {
            const composition: Composition = {
              id: uniqueId(),
              meal_id: meal.id,
              ingredient_id: ingredientId,
            };
            return dispatch(addComposition(composition));
          }
        });

        // Remove old compositions
        const deletePromises = existingCompositions.map((composition) => {
          if (!newIngredients.includes(composition.ingredient_id)) {
            return dispatch(deleteComposition(composition.id));
          }
        });

        // Update existing compositions if necessary
        const updatePromises = existingCompositions.map((composition) => {
          if (
            newIngredients.includes(composition.ingredient_id) &&
            composition.meal_id === meal.id
          ) {
            const updatedComposition: Composition = {
              ...composition,
              ingredient_id: composition.ingredient_id,
            };
            return dispatch(
              updateComposition(composition.id, updatedComposition)
            );
          }
        });

        Promise.all([...addPromises, ...deletePromises, ...updatePromises])
          .then(() => {
            showSuccessToast("Selected meal updated successfully");
          })
          .catch((error) => {
            showErrorToast(`${`Error updating selected meal: ${error}`}`);
          });
      });
    }

    setOpen(false);
  }

  function closeDrawer(event: React.MouseEvent) {
    event.preventDefault();
    setOpen(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-row justify-between items-center text-[17px] font-semibold text-neutral-400 ">
          <button onClick={closeDrawer}>Cancel</button>
          <div className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-200 ">
            {actionType === "create" ? "New Meal" : "Edit"}
          </div>
          <button
            type="submit"
            disabled={!form.formState.isDirty}
            className={`${
              form.formState.isDirty
                ? "text-orange-500"
                : "text-neutral-400 cursor-not-allowed"
            } px-4 py-2 rounded`}
          >
            {actionType === "create" ? "Save" : "Update"}
          </button>
        </div>
        <div className="flex flex-row items-center space-x-4 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MealImage
                    onImageChange={field.onChange}
                    currentImage={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel className="text-xs font-medium text-neutral-400">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="px-3 py-[10px] w-full bg-neutral-100 focus:bg-neutral-100 focus-visible:ring-0 caret-orange-500 text-neutral-900 text-base"
                    placeholder="Meal name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-t border-dashed border-neutral-200 pt-4 mt-4">
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-neutral-400">
                  Ingredients
                </FormLabel>
                <SelectIngredientComboBox
                  options={ingredientSelectOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
export default MealForm;
