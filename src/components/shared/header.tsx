"use client";

import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <NavigationMenu className="max-w-full py-2 border-b mb-2">
      <NavigationMenuList>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link to="/">Weekly Plan</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link to="/meals">Meals</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link to="/ingredients">Grocery List</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
