import { NavItem } from "@/types/common-ui";
import { CalendarCheck, CookingPot, ShoppingCart } from "lucide-react";

export const NAVBAR: NavItem[] = [
  { title: "Schedule", href: "/", icon: CalendarCheck },
  { title: "Meals", href: "/meals", icon: CookingPot },
  { title: "Grocery list", href: "/ingredients", icon: ShoppingCart },
];
