export interface FeatureItem {
  title: string;
  description: string;
  image: string;
  color: string;
  bullets: string[];
}

export const featureItems: FeatureItem[] = [
  {
    title: "Kasir Modern",
    description:
      "Transaksi lebih cepat menggunakan POS modern yang ringan, responsif dan mudah digunakan.",

    image: "/landing/dashboard.png",

    color: "from-[#343C67] to-[#4F5D95]",

    bullets: [
      "Barcode Scanner",
      "Split Payment",
      "Cetak Struk",
    ],
  },

  {
    title: "Inventory Realtime",
    description:
      "Pantau stok secara realtime tanpa pencatatan manual sehingga bisnis selalu terkendali.",

    image: "/landing/dashboard.png",

    color: "from-orange-500 to-orange-600",

    bullets: [
      "Stock Opname",
      "Transfer Gudang",
      "Multi Gudang",
    ],
  },

  {
    title: "Dashboard Analytics",
    description:
      "Seluruh laporan bisnis tersaji realtime mulai omzet, profit hingga performa outlet.",

    image: "/landing/dashboard.png",

    color: "from-emerald-500 to-emerald-600",

    bullets: [
      "Profit",
      "Omzet",
      "Export Excel",
    ],
  },

  {
    title: "Multi Outlet",
    description:
      "Kelola seluruh cabang dari satu dashboard cloud dengan sinkronisasi realtime.",

    image: "/landing/dashboard.png",

    color: "from-pink-500 to-pink-600",

    bullets: [
      "Cabang Unlimited",
      "Hak Akses",
      "Realtime Sync",
    ],
  },
];