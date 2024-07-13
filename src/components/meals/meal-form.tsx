"use client";

import React from "react";

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

import { Meal } from "@/types";
import { CuisineType, MealType } from "@/types/constants";
import { useAppDispatch } from "@/store/hooks";
import { addMeal, deleteMeal, updateMeal } from "@/store/meals-actions";
import { cuisineTypeInfo, mealTypeInfo } from "@/__mocks/info";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
  { label: "tomato", value: "tomato" },
  { label: "potato", value: "potato" },
  { label: "spageti", value: "spageti" },
  { label: "butter", value: "butter" },
  { label: "milk", value: "milk" },
  { label: "onion", value: "onion" },
  { label: "greound beef", value: "greound beef" },
  { label: "sour cream", value: "sour cream" },
  { label: "garlic", value: "garlic" },
];

type ActionType = "create" | "update";

interface MealFormProps {
  actionType: ActionType;
  mealToUpdate?: Meal;
}

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

const MealForm = ({ actionType, mealToUpdate }: MealFormProps) => {
  const [value, setValue] = React.useState<Option[]>([]);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ingredients: [],
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
      // ingredients: values.ingredients.map((name) => ({
      //   id: Math.floor(Math.random() * Math.pow(2, 20)),
      //   name: name,
      //   available: false,
      // })),
      cuisine: CuisineType[values.cuisine as keyof typeof CuisineType],
      type: MealType[values.type as keyof typeof MealType],
    };

    if (actionType === "create") {
      dispatch(addMeal(meal));
    } else if (actionType === "update") {
      dispatch(updateMeal(meal.id, meal));
    }

    form.reset();
  }

  const onDelete = () => {
    if (mealToUpdate) {
      dispatch(deleteMeal(mealToUpdate.id));
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
          render={() => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <MultipleSelector
                defaultOptions={OPTIONS}
                value={value}
                onChange={setValue}
                placeholder="Select ingredients"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
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
