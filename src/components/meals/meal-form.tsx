export default {};
// "use client";

// import React from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Meal, Ingredient } from "@/types";
// import { CuisineType, MealType } from "@/types/constants";
// import { useAppDispatch } from "@/store/hooks";
// import { addMeal, deleteMeal, updateMeal } from "@/store/meals-actions";
// import { cuisineTypeInfo, mealTypeInfo } from "@/__mocks/info";

// import { MultiSelect } from "@/components/ui/multi-select";
// import { SelectOption } from "@/types/common-ui";

// import { useAppSelector } from "@/store/hooks";
// import { ingredientDataAsSelectOptions } from "@/lib/utils";

// type ActionType = "create" | "update";

// interface MealFormProps {
//   actionType: ActionType;
//   mealToUpdate?: Meal;
// }

// const formSchema = z.object({
//   name: z
//     .string()
//     .min(2, {
//       message: "Name must be at least 2 characters.",
//     })
//     .max(250, {
//       message: "Name must not be longer than 250 characters.",
//     }),
//   ingredients: z.array(z.string()),
//   cuisine: z.enum(cuisineTypeInfo),
//   type: z.enum(mealTypeInfo),
// });

// const MealForm = ({ actionType, mealToUpdate }: MealFormProps) => {
//   const ingredientsData = useAppSelector<Ingredient[]>(
//     (state) => state.ingredients.ingredients
//   );

//   const ingredientSelectOptions: SelectOption[] =
//     ingredientDataAsSelectOptions(ingredientsData);
//   const dispatch = useAppDispatch();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       ingredients: [],
//       cuisine: cuisineTypeInfo[0] as CuisineType,
//       type: mealTypeInfo[1] as MealType,
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     const meal: Meal = {
//       id: mealToUpdate
//         ? mealToUpdate.id
//         : Math.floor(Math.random() * Math.pow(2, 20)),
//       name: values.name,
//       ingredients: values.ingredients.map((name) => ({
//         id: Math.floor(Math.random() * Math.pow(2, 20)),
//         name: name,
//         available: false,
//       })),
//       cuisine: CuisineType[values.cuisine as keyof typeof CuisineType],
//       type: MealType[values.type as keyof typeof MealType],
//     };

//     if (actionType === "create") {
//       dispatch(addMeal(meal));
//     } else if (actionType === "update") {
//       dispatch(updateMeal(meal.id, meal));
//     }

//     form.reset();
//   }

//   const onDelete = () => {
//     if (mealToUpdate) {
//       dispatch(deleteMeal(mealToUpdate.id));
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Meal name" {...field} />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="ingredients"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Ingredients</FormLabel>
//               <MultiSelect
//                 options={ingredientSelectOptions}
//                 onValueChange={field.onChange}
//                 defaultValue={field.value}
//                 placeholder="Select Ingredients"
//                 variant="inverted"
//                 animation={2}
//               />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="cuisine"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Cuisine</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a cuisine" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {cuisineTypeInfo.map((item) => (
//                     <SelectItem key={item} value={item}>
//                       {item}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="type"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Meal Type</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {mealTypeInfo.map((item) => (
//                     <SelectItem key={item} value={item}>
//                       {item}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="space-x-4 text-left">
//           {actionType === "update" ? (
//             <Button variant="destructive" onClick={onDelete}>
//               Delete
//             </Button>
//           ) : null}
//           <Button type="submit">
//             {actionType === "create" ? "Add Meal" : "Update Meal"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };
// export default MealForm;
