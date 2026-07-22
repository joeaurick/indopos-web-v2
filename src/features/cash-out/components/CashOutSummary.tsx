"use client";

import { useEffect } from "react";

import {
  Wallet,
  CalendarDays,
  CalendarRange,
  Receipt,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useCashOutStore } from "../store/cash-out.store";

type Props = {
  businessId: string;
};

export function CashOutSummary({
  businessId,
}: Props) {
  const fetchCashOut =
    useCashOutStore(
      (state) => state.fetchCashOut
    );

  const summary =
    useCashOutStore(
      (state) => state.data.summary
    );

  const loading =
    useCashOutStore(
      (state) => state.loading
    );

  useEffect(() => {
    fetchCashOut(
      businessId
    );
  }, [
    businessId,
    fetchCashOut,
  ]);

  const cards = [
    {
      title: "Total Pengeluaran",
      value: summary.totalExpense,
      icon: Wallet,
      color: "bg-red-600",
    },
    {
      title: "Hari Ini",
      value: summary.todayExpense,
      icon: CalendarDays,
      color: "bg-orange-500",
    },
    {
      title: "Bulan Ini",
      value: summary.monthExpense,
      icon: CalendarRange,
      color: "bg-blue-600",
    },
    {
      title: "Total Transaksi",
      value: summary.totalTransaction,
      icon: Receipt,
      color: "bg-violet-600",
      count: true,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              {loading ? (
                <div className="mt-3 h-9 w-28 animate-pulse rounded bg-slate-200" />
              ) : card.count ? (
                <h2 className="mt-2 text-4xl font-bold">
                  {card.value}
                </h2>
              ) : (
                <h2 className="mt-2 text-4xl font-bold">
                  Rp{" "}
                  {Number(
                    card.value
                  ).toLocaleString(
                    "id-ID"
                  )}
                </h2>
              )}
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white ${card.color}`}
            >
              <card.icon size={30} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}