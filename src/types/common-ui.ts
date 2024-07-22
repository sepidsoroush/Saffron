import { LucideIcon } from "lucide-react";

export interface Domain {
  id: number;
}

export interface Category extends Domain {
  name: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}
