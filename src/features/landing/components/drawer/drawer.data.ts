import {
  BadgeDollarSign,
  Boxes,
  CircleHelp,
  LayoutDashboard,
  Package,
  Store,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface DrawerChildItem {
  title: string;
  href: string;
}

export interface DrawerMenuItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  children?: DrawerChildItem[];
}

export const drawerMenus: DrawerMenuItem[] = [
  {
    title: "Produk",
    icon: Package,
    children: [
      {
        title: "Kasir Modern",
        href: "#features",
      },
      {
        title: "Inventory",
        href: "#features",
      },
      {
        title: "Pembukuan",
        href: "#features",
      },
    ],
  },

  {
    title: "Solusi",
    icon: Store,
    children: [
      {
        title: "Retail",
        href: "#showcase",
      },
      {
        title: "Restaurant",
        href: "#showcase",
      },
      {
        title: "Cafe",
        href: "#showcase",
      },
    ],
  },

  {
    title: "Fitur",
    href: "#features",
    icon: Boxes,
  },

  {
    title: "Showcase",
    href: "#showcase",
    icon: LayoutDashboard,
  },

  {
    title: "Harga",
    href: "#pricing",
    icon: BadgeDollarSign,
  },

  {
    title: "FAQ",
    href: "#faq",
    icon: CircleHelp,
  },
];