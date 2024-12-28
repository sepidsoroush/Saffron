import { NavItem, SiteConfig } from "@/types/common-ui";

import {
  Calendar3Fill,
  ChefHatLine,
  Basket2Line,
  Settings1Fill,
} from "@/components/shared/icons";

export const NAVBAR: NavItem[] = [
  { title: "Schedule", href: "/schedule", icon: Calendar3Fill },
  { title: "Meals", href: "/meals", icon: ChefHatLine },
  { title: "Grocery list", href: "/ingredients", icon: Basket2Line },
  { title: "Setting", href: "/setting", icon: Settings1Fill },
];

export const footerLinks: NavItem[] = [
  { title: "About", href: "#" },
  { title: "Docs", href: "#" },
  { title: "FAQ", href: "#" },
  { title: "Blog", href: "#" },
];

const site_url = import.meta.env.VITE_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Saffron",
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
