import { MenuItem } from "@/types/menu";

export const headerData: MenuItem[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Fitur",
    submenu: [
      { id: 21, label: "Kenal Batik", href: "/KenalBatik" },
      { id: 22, label: "Batik Fit", href: "/BatikFit" },
      { id: 23, label: "Studio Kreasi", href: "/StudioKreasi" },
      { id: 24, label: "Batik Pedia", href: "/BatikPedia" },
    ],
  },
  {
    id: 3,
    label: "Galeri",
    href: "/#galeri",
  },
];
