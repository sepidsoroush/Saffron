import { useNavigate } from "react-router-dom";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import ConfirmAlertDialog from "@/components/shared/confirm-alert";

import { Meal, Ingredient, Composition } from "@/types";
import { SelectOption } from "@/types/common-ui";
import { CuisineType, MealType } from "@/types/constants";

import { cuisineTypeInfo, mealTypeInfo } from "@/__mocks/info";
import { ingredientDataAsSelectOptions } from "@/lib/utils";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addMeal, deleteMeal, updateMeal } from "@/store/actions/meals-actions";
import {
  addComposition,
  updateComposition,
  deleteComposition,
} from "@/store/actions/compositions-actions";

import { showErrorToast, showSuccessToast } from "@/lib/utils";

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
  cuisine: z.enum(cuisineTypeInfo),
  type: z.enum(mealTypeInfo),
});

const MealForm = ({ actionType, mealToUpdate }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const ingredientsData = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );
  const compositionsData = useAppSelector<Composition[]>(
    (state) => state.compositions.compositions
  );

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
      cuisine: cuisineTypeInfo[0] as CuisineType,
      type: mealTypeInfo[1] as MealType,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const meal: Meal = {
      id: mealToUpdate
        ? mealToUpdate.id
        : Math.floor(Math.random() * Math.pow(2, 20)),
      name: values.name,
      cuisine: CuisineType[values.cuisine as keyof typeof CuisineType],
      type: MealType[values.type as keyof typeof MealType],
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
            showSuccessToast("Selected meal updated successfully");
          })
          .catch((error) => {
            showErrorToast(`${`Error updating selected meal: ${error}`}`);
          });
      });
    }

    navigate("/meals");
  }

  const onDelete = async () => {
    if (mealToUpdate) {
      try {
        const compositionsToDelete = compositionsData.filter(
          (c) => c.meal_id === mealToUpdate.id
        );
        // Delete all related compositions
        const deleteCompositionPromises = compositionsToDelete.map((c) =>
          dispatch(deleteComposition(c.id))
        );
        await Promise.all(deleteCompositionPromises);
        // Delete the meal
        await dispatch(deleteMeal(mealToUpdate.id));
        showSuccessToast("Meal and related compositions deleted!");

        navigate("/meals");
      } catch (error) {
        showErrorToast(`${`Error deleting meal and compositions: ${error}`}`);
      }
    }
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
                maxCount={30}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cuisine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisine</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cuisine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cuisineTypeInfo.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mealTypeInfo.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4 text-left">
          {actionType === "update" ? (
            <ConfirmAlertDialog
              onConfirm={onDelete}
              triggerText="Delete"
              descriptionText="This action cannot be undone. This will permanently delete the meal and remove its data from our servers."
            />
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
