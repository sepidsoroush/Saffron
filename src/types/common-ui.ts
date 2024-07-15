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
