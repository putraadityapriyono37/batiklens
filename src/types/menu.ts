// src/types/menu.ts

export type SubMenuItem = {
  label: string;
  href: string;
};

export type MenuItem = {
  label:string;
  href?: string; // href dibuat opsional agar 'Fitur' tidak error
  submenu?: SubMenuItem[];
};