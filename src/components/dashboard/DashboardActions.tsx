"use client";

import { useRouter } from "next/navigation";

import {
  ShoppingBasket,
  HandCoins,
  WalletCards,
  ChevronRight,
} from "lucide-react";

export function DashboardActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Penjualan Baru",
      subtitle: "Mulai transaksi kasir",
      icon: ShoppingBasket,
      href: "/pos",
      color: "#343C67",
      bg: "bg-[#EEF1FF]",
    },
    {
      title: "Kas Masuk",
      subtitle: "Catat pemasukan kas",
      icon: HandCoins,
      href: "/cash-in",
      color: "#16A34A",
      bg: "bg-emerald-50",
    },
    {
      title: "Kas Keluar",
      subtitle: "Catat pengeluaran kas",
      icon: WalletCards,
      href: "/cash-out",
      color: "#EA580C",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        xl:w-[320px]
      "
    >
      {actions.map((item) => {

        const Icon = item.icon;

        return (

          <button
            key={item.title}
            onClick={() => router.push(item.href)}
            className="
              group

              flex
              items-center
              justify-between

              rounded-3xl

              border
              border-slate-200

              bg-white

              p-5

              text-left

              shadow-sm

              transition-all
              duration-200

              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <div className="flex items-center gap-4">

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-2xl

                  ${item.bg}
                `}
              >

                <Icon
                  size={22}
                  color={item.color}
                />

              </div>

              <div>

                <h3
                  className="
                    font-semibold

                    text-slate-900
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-1

                    text-sm

                    text-slate-500
                  "
                >
                  {item.subtitle}
                </p>

              </div>

            </div>

            <ChevronRight
              size={18}
              className="
                text-slate-400

                transition-transform

                group-hover:translate-x-1
              "
            />

          </button>

        );

      })}
    </div>
  );
}