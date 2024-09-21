import { LucideIcon } from "lucide-react";

export interface Domain {
  id: number;
}

export interface SelectOption {
  value: string;
  label: string;
  category?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface FeatureInfo {
  image: string;
  title: string;
  description: string;
}
