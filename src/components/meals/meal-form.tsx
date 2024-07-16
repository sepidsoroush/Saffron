"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";

import { Meal, Ingredient, Composition } from "@/types";
import { SelectOption } from "@/types/common-ui";

import { useAppSelector } from "@/store/hooks";
import { ingredientDataAsSelectOptions } from "@/lib/utils";

// import { CuisineType, MealType } from "@/types/constants";
import { useAppDispatch } from "@/store/hooks";
import { addMeal, updateMeal } from "@/store/actions/meals-actions";
import {
  addComposition,
  updateComposition,
  deleteComposition,
} from "@/store/actions/compositions-actions";
// import { cuisineTypeInfo, mealTypeInfo } from "@/__mocks/info";

type ActionType = "create" | "update";

type Props = {
  actionType: ActionType;
  mealToUpdate?: Meal;
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
});

const MealForm = ({ actionType, mealToUpdate }: Props) => {
  const dispatch = useAppDispatch();

  const ingredientsData = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );
  const compositionsData = useAppSelector<Composition[]>(
    (state) => state.compositions.compositions
  );

  const ingredientSelectOptions: SelectOption[] =
    ingredientDataAsSelectOptions(ingredientsData);

  // const ingredientsInRecipe = compositionsData
  //   .filter((item) => item.meal_id === mealToUpdate.id)
  //   .map((item) => item.ingredient_id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mealToUpdate ? mealToUpdate.name : "",
      ingredients: mealToUpdate
        ? compositionsData
            .filter((item) => item.meal_id === mealToUpdate.id)
            .map((item) => item.ingredient_id.toString())
        : [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const meal: Meal = {
      id: mealToUpdate
        ? mealToUpdate.id
        : Math.floor(Math.random() * Math.pow(2, 20)),
      name: values.name,
      // cuisine: CuisineType[values.cuisine as keyof typeof CuisineType],
      // type: MealType[values.type as keyof typeof MealType],
    };

    if (actionType === "create") {
      dispatch(addMeal(meal)).then(() => {
        const compositionPromises = values.ingredients.map((ingredientId) => {
          const composition: Composition = {
            id: Math.floor(Math.random() * Math.pow(2, 20)),
            meal_id: meal.id,
            ingredient_id: Number(ingredientId),
          };
          return dispatch(addComposition(composition));
        });

        Promise.all(compositionPromises)
          .then(() => {
            console.log("All compositions added successfully");
          })
          .catch((error) => {
            console.error("Error adding compositions:", error);
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
              id: Math.floor(Math.random() * Math.pow(2, 20)),
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
            console.log("All compositions updated successfully");
          })
          .catch((error) => {
            console.error("Error updating compositions:", error);
          });
      });
    }

    form.reset();
  }

  const onDelete = () => {
    console.log("delete");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Meal name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <MultiSelect
                options={ingredientSelectOptions}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder="Select Ingredients"
                variant="inverted"
                animation={2}
              />
            </FormItem>
          )}
        />
        <div className="space-x-4 text-left">
          {actionType === "update" ? (
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          ) : null}
          <Button type="submit">
            {actionType === "create" ? "Add Meal" : "Update Meal"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default MealForm;
