import {
  LayoutDashboard,
  ShoppingCart,
  ReceiptText,
  Boxes,
  Package,
  Tags,
  Users,
  Truck,
  Wallet,
  BarChart3,
  Settings,
  ClipboardList,
  History,
} from "lucide-react";

export const navigation = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Point of Sale",
        href: "/pos",
        icon: ShoppingCart,
      },
    ],
  },

  {
    title: "Transaction",
    items: [
      {
        title: "Sales",
        href: "/sales",
        icon: ReceiptText,
      },
      {
        title: "Purchasing",
        href: "/purchasing",
        icon: ClipboardList,
      },
      {
        title: "Cash In",
        href: "/cash-in",
        icon: Wallet,
      },
      {
        title: "Cash Out",
        href: "/cash-out",
        icon: Wallet,
      },
    ],
  },

  {
    title: "Inventory",
    items: [
      {
        title: "Inventory",
        href: "/inventory",
        icon: Boxes,
      },
      {
        title: "Adjustment",
        href: "/inventory-adjustment",
        icon: Package,
      },
      {
        title: "Stock Card",
        href: "/stock-card",
        icon: History,
      },
    ],
  },

  {
    title: "Master Data",
    items: [
      {
        title: "Products",
        href: "/products",
        icon: Package,
      },
      {
        title: "Categories",
        href: "/categories",
        icon: Tags,
      },
      {
        title: "Customers",
        href: "/customers",
        icon: Users,
      },
      {
        title: "Suppliers",
        href: "/suppliers",
        icon: Truck,
      },
    ],
  },

  {
    title: "Analytics",
    items: [
      {
        title: "Finance",
        href: "/finance",
        icon: Wallet,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];