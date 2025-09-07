export type MenuItem = {
  id: number;
  label: string;
  href?: string;
  submenu?: MenuItem[]; // support nested menu
};
