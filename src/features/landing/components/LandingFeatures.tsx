"use client";

import {
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    title: "Kasir Modern",
    description:
      "Transaksi lebih cepat dengan POS modern berbasis Flutter yang responsif dan mudah digunakan.",

    image: "/landing/dashboard.png",

    color: "from-indigo-500 to-indigo-700",

    bullets: [
      "Barcode Scanner",
      "Split Payment",
      "Cetak Struk",
    ],
  },

  {
    title: "Inventory Realtime",
    description:
      "Pantau stok setiap saat secara realtime tanpa pencatatan manual.",

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
      "Laporan penjualan, profit dan performa bisnis dalam satu dashboard cloud.",

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
      "Kelola seluruh cabang dari satu dashboard tanpa harus berpindah aplikasi.",

    image: "/landing/dashboard.png",

    color: "from-pink-500 to-pink-600",

    bullets: [
      "Cabang Unlimited",
      "Hak Akses",
      "Realtime Sync",
    ],
  },
];

export function LandingFeatures() {
  return (
    <section
  id="features"
  className="
    relative

    bg-white

    pt-48
    pb-40

    overflow-hidden
  "
>
      <div
        className="
          mx-auto
          max-w-7xl

          px-6

          lg:px-8
        "
      >
        <div
  className="
    mx-auto

    flex
    flex-col
    items-center

    text-center
  "
>

          <span
            className="
              inline-flex

              rounded-full

              bg-[#343C67]/10

              px-4
              py-2

              text-sm
              font-semibold

              text-[#343C67]
            "
          >
            Features
          </span>

          <h2
  className="
    mt-8

    max-w-4xl

    text-center

    text-5xl
    font-black
    leading-tight

    text-slate-900

    lg:text-6xl
  "
>
            Semua Yang Anda Butuhkan
          </h2>

          <p
  className="
    mt-8

    max-w-3xl

    text-center

    text-xl
    leading-9

    text-slate-500
  "
>
            IndoPOS dibangun untuk membantu bisnis
            berkembang dengan sistem yang cepat,
            modern dan mudah digunakan.
          </p>

        </div>

        <div
          className="
            mt-32

            grid
            gap-12

            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {features.map((item) => (

  <article
    key={item.title}
    className="
      group

      overflow-hidden

      rounded-[32px]

      border
      border-slate-200

      bg-white

      shadow-sm

      transition-all
      duration-500

      hover:-translate-y-2
      hover:shadow-2xl
    "
  >

    {/* IMAGE */}

    <div
      className="
        overflow-hidden

        bg-slate-100
      "
    >

      <img
        src={item.image}
        alt={item.title}
        className="
          aspect-[16/10]
          w-full
          object-cover

          transition-transform
          duration-700

          group-hover:scale-105
        "
      />

    </div>

    {/* CONTENT */}

    <div className="p-10">

      {/* BADGE */}

      <div
        className={`
          inline-flex

          rounded-full

          bg-gradient-to-r

          ${item.color}

          px-4
          py-2

          text-sm
          font-semibold

          text-white
        `}
      >
        {item.title}
      </div>

      {/* TITLE */}

      <h3
        className="
          mt-8

          text-3xl
          font-bold

          text-slate-900
        "
      >
        {item.title}
      </h3>

      {/* DESCRIPTION */}

      <p
        className="
          mt-5

          leading-8

          text-slate-500
        "
      >
        {item.description}
      </p>

      {/* BULLET */}

      <div
        className="
          mt-8

          space-y-4
        "
      >

        {item.bullets.map((bullet) => (

          <div
            key={bullet}
            className="flex items-center gap-3"
          >

            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center

                rounded-full

                bg-emerald-100
              "
            >

              <Check
                size={16}
                className="text-emerald-600"
              />

            </div>

            <span
              className="
                text-[15px]
                text-slate-700
              "
            >
              {bullet}
            </span>

          </div>

        ))}

      </div>

      {/* BUTTON */}

      <button
        className="
          mt-10

          inline-flex
          items-center
          gap-2

          font-semibold

          text-[#343C67]

          transition-all

          group-hover:gap-4
        "
      >
        Pelajari Selengkapnya

        <ArrowRight size={18} />

      </button>

    </div>

  </article>

))}

        </div>

      </div>

    </section>
  );
}