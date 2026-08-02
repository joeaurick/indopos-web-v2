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
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Kasir",
        href: "/pos",
        icon: ShoppingCart,
      },
    ],
  },

  {
    title: "Transaksi",
    items: [
      {
        title: "Penjualan",
        href: "/sales",
        icon: ReceiptText,
      },
      {
        title: "Pembelian",
        href: "/purchasing",
        icon: ClipboardList,
      },
    ],
  },

  {
    title: "Keuangan",
    items: [
      {
        title: "Kas Masuk",
        href: "/cash-in",
        icon: Wallet,
      },
      {
        title: "Kas Keluar",
        href: "/cash-out",
        icon: Wallet,
      },
      {
        title: "Laporan",
        href: "/reports",
        icon: BarChart3,
      },
    ],
  },

  {
    title: "Inventori",
    items: [
      {
        title: "Inventori",
        href: "/inventory",
        icon: Boxes,
      },
      {
        title: "Penyesuaian Stok",
        href: "/inventory-adjustment",
        icon: Package,
      },
      {
        title: "Kartu Stok",
        href: "/stock-card",
        icon: History,
      },
    ],
  },

  {
    title: "Data Master",
    items: [
      {
        title: "Produk",
        href: "/products",
        icon: Package,
      },
      {
        title: "Kategori",
        href: "/categories",
        icon: Tags,
      },
      {
        title: "Pelanggan",
        href: "/customers",
        icon: Users,
      },
      {
        title: "Supplier",
        href: "/suppliers",
        icon: Truck,
      },
    ],
  },

  {
    title: "Pengaturan",
    items: [
      {
        title: "Pengaturan",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];