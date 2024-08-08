import { NavItem } from "@/types/common-ui";
import { Schedule } from "@/types";
import { WeekDay } from "@/types/constants";
import {
  CalendarCheck,
  CookingPot,
  ShoppingCart,
  Settings,
} from "lucide-react";

export const NAVBAR: NavItem[] = [
  { title: "Schedule", href: "/schedule", icon: CalendarCheck },
  { title: "Meals", href: "/meals", icon: CookingPot },
  { title: "Grocery list", href: "/ingredients", icon: ShoppingCart },
  { title: "Setting", href: "/setting", icon: Settings },
];

export const emptySchedule: Schedule[] = [
  { day_id: 1, day: WeekDay.Monday, meal_id: undefined },
  { day_id: 2, day: WeekDay.Tuesday, meal_id: undefined },
  { day_id: 3, day: WeekDay.Wednesday, meal_id: undefined },
  { day_id: 4, day: WeekDay.Thursday, meal_id: undefined },
  { day_id: 5, day: WeekDay.Friday, meal_id: undefined },
  { day_id: 6, day: WeekDay.Saturday, meal_id: undefined },
  { day_id: 7, day: WeekDay.Sunday, meal_id: undefined },
];
