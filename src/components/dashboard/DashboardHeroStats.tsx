"use client";

import {
  ClipboardCheck,
  HandCoins,
  Boxes,
} from "lucide-react";

import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardHeroStats() {
  const summary = useDashboardStore(
    (state) => state.data.summary
  );

  const cards = [
    {
      title: "Transaksi Hari Ini",
      value: summary.todayTransactions.toLocaleString("id-ID"),
      subtitle: "Hari ini",
      icon: ClipboardCheck,
      color: "#343C67",
      bg: "bg-[#EEF1FF]",
    },
    {
      title: "Revenue Hari Ini",
      value: `Rp ${summary.todayIncome.toLocaleString("id-ID")}`,
      subtitle: "Pendapatan",
      icon: HandCoins,
      color: "#16A34A",
      bg: "bg-emerald-50",
    },
    {
      title: "Low Stock",
      value: summary.lowStock.toLocaleString("id-ID"),
      subtitle: "Perlu Restock",
      icon: Boxes,
      color: "#EA580C",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div
      className="
        mt-6

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
              rounded-3xl

              border
              border-slate-200

              bg-white

              p-6

              shadow-sm

              transition-all
              duration-200

              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p
                  className="
                    text-sm

                    font-medium

                    text-slate-500
                  "
                >
                  {card.title}
                </p>

                <h2
                  className="
                    mt-3

                    text-3xl

                    font-bold

                    text-slate-900
                  "
                >
                  {card.value}
                </h2>

                <p
                  className="
                    mt-2

                    text-sm

                    text-slate-400
                  "
                >
                  {card.subtitle}
                </p>

              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  ${card.bg}
                `}
              >

                <Icon
                  size={26}
                  color={card.color}
                />

              </div>

            </div>

          </div>

        );

      })}
    </div>
  );
}