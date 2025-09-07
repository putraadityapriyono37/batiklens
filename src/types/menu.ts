// src/types/menu.ts

export type SubMenuItem = {
  label: string;
  href: string;
};

export type MenuItem = {
  id: number;
  label: string;
  href?: string;
  submenu?: MenuItem[];
};