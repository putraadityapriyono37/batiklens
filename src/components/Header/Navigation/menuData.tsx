// src/config/menuData.ts

import { MenuItem } from "@/types/menu";

// Pastikan tipe MenuItem di src/types/menu.ts adalah:
// export type MenuItem = {
//   id: number;
//   label: string;
//   href?: string;
//   submenu?: MenuItem[];
// };

export const headerData: MenuItem[] = [
  {
    id: 1,
    label: "Home", // Menggunakan 'label' bukan 'title'
    href: "/",     // Menggunakan 'href' bukan 'path'
  },
  {
    id: 2,
    label: "Fitur", // Menggunakan 'label'
    submenu: [
      {
        id: 21,
        label: "Kenal Batik",
        href: "/KenalBatik",
      },
      {
        id: 22,
        label: "Batik Fit",
        href: "/BatikFit",
      },
      {
        id: 23,
        label: "Studio Kreasi",
        href: "/StudioKreasi",
      },
      {
        id: 24,
        label: "Batik Pedia",
        href: "/BatikPedia",
      },
    ],
  },
  {
    id: 3,
    label: "Galeri",  // Menggunakan 'label'
    href: "/#galeri", // Menggunakan 'href'
  },
];
