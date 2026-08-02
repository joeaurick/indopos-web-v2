"use client";

import {
  ShoppingCart,
  Boxes,
  BarChart3,
  Users,
  Store,
  Smartphone,
} from "lucide-react";

const features = [
  {
    title: "Kasir Modern",
    desc: "Transaksi cepat dengan tampilan POS Flutter yang modern dan mudah digunakan.",
    icon: ShoppingCart,
    color: "bg-[#EEF1FF]",
    iconColor: "text-[#343C67]",
  },
  {
    title: "Inventory Real-time",
    desc: "Stok otomatis berkurang setiap transaksi tanpa input manual.",
    icon: Boxes,
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "Dashboard Analytics",
    desc: "Pantau omzet, profit, transaksi dan performa bisnis secara realtime.",
    icon: BarChart3,
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Multi User",
    desc: "Atur hak akses Owner, Admin dan Kasir dalam satu sistem.",
    icon: Users,
    color: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    title: "Multi Outlet",
    desc: "Kelola seluruh cabang dari satu dashboard cloud.",
    icon: Store,
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Mobile & Desktop",
    desc: "Dashboard web terintegrasi dengan aplikasi Flutter POS.",
    icon: Smartphone,
    color: "bg-pink-50",
    iconColor: "text-pink-600",
  },
];

export function LandingFeatures() {
  return (
    <section
      id="features"
      className="
        bg-white

        py-28
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
        <div className="text-center">

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
              mt-6

              text-4xl

              font-bold

              text-slate-900

              lg:text-5xl
            "
          >
            Semua Yang Anda Butuhkan
          </h2>

          <p
            className="
              mx-auto
              mt-6

              max-w-3xl

              text-lg
              leading-8

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
            mt-20

            grid
            gap-6

            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {features.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="
                  group

                  rounded-3xl

                  border
                  border-slate-200

                  bg-white

                  p-8

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center

                    rounded-2xl

                    ${item.color}
                  `}
                >

                  <Icon
                    size={28}
                    className={item.iconColor}
                  />

                </div>

                <h3
                  className="
                    mt-6

                    text-xl
                    font-bold

                    text-slate-900
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3

                    leading-7

                    text-slate-500
                  "
                >
                  {item.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}