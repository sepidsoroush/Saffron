import { NavItem, SiteConfig } from "@/types/common-ui";
import {
  CalendarCheck,
  CookingPot,
  ShoppingCart,
  Settings,
  Twitter,
  Github,
  Mail,
} from "lucide-react";

export const NAVBAR: NavItem[] = [
  { title: "Schedule", href: "/schedule", icon: CalendarCheck },
  { title: "Meals", href: "/meals", icon: CookingPot },
  { title: "Grocery list", href: "/ingredients", icon: ShoppingCart },
  { title: "Setting", href: "/setting", icon: Settings },
];

export const footerLinks: NavItem[] = [
  { title: "About", href: "#" },
  { title: "Docs", href: "#" },
  { title: "FAQ", href: "#" },
  { title: "Blog", href: "#" },
];

const site_url = import.meta.env.VITE_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Bite Board",
  description:
    "Custom meal plans, personalized recipes and grocery lists to help you save time and eat better.",
  url: site_url,
  ogImage: `${site_url}/opengraph-image`,
  links: {
    twitter: "https://twitter.com/iamsepid",
    github: "https://github.com/sepidsoroush",
  },
  mailSupport: "s.soroush2012@gmail.com",
};
