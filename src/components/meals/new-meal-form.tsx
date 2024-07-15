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

import { Meal, Ingredient } from "@/types";
import { SelectOption } from "@/types/common-ui";

import { useAppSelector } from "@/store/hooks";
import { ingredientDataAsSelectOptions } from "@/lib/utils";

type ActionType = "create" | "update";

interface NewMealFormProps {
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
});

const NewMealForm = ({ actionType }: NewMealFormProps) => {
  const ingredientsData = useAppSelector<Ingredient[]>(
    (state) => state.ingredients.ingredients
  );

  const ingredientSelectOptions: SelectOption[] =
    ingredientDataAsSelectOptions(ingredientsData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ingredients: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

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
export default NewMealForm;
