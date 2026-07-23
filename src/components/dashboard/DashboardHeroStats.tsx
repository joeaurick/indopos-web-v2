"use client";

import {
  ClipboardCheck,
  HandCoins,
  Boxes,
} from "lucide-react";

import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardHeroStats() {
  const summary =
    useDashboardStore(
      (state) => state.data.summary
    );

  const cards = [
    {
      title: "Transaksi Hari Ini",
      value: `${summary.todayTransactions} Transaksi`,
      icon: ClipboardCheck,
      color:
        "from-blue-500 to-indigo-600",
    },
    {
      title: "Revenue Hari Ini",
      value: `Rp ${summary.todayIncome.toLocaleString(
        "id-ID"
      )}`,
      icon: HandCoins,
      color:
        "from-emerald-500 to-teal-600",
    },
    {
      title: "Low Stock",
      value: `${summary.lowStock} Produk`,
      icon: Boxes,
      color:
        "from-orange-500 to-amber-600",
    },
  ];

  return (
    <div
      className="
        mt-8
        grid
        grid-cols-1
        gap-5

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div
              className={`
                absolute
                right-0
                top-0
                h-36
                w-36
                rounded-full
                bg-gradient-to-br
                ${card.color}
                opacity-[0.08]
                blur-3xl
              `}
            />

            <div className="relative flex items-center gap-5">
              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${card.color}
                  text-white
                  shadow-lg
                  transition
                  duration-300
                  group-hover:scale-110
                  group-hover:-rotate-6
                `}
              >
                <Icon size={28} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {card.value}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}