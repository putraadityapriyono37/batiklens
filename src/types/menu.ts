// src/types/menu.ts
export type MenuItem = {
  id: number;
  label: string;
  href?: string;
  submenu?: MenuItem[];
};