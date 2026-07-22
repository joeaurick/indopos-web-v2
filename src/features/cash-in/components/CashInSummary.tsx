"use client";

import { useEffect } from "react";

import {
  Wallet,
  CalendarDays,
  CalendarRange,
  Receipt,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useCashInStore } from "../store/cash-in.store";

type Props = {
  businessId: string;
};

export function CashInSummary({
  businessId,
}: Props) {
  const fetchCashIn =
    useCashInStore(
      (state) => state.fetchCashIn
    );

  const summary =
    useCashInStore(
      (state) => state.data.summary
    );

  const loading =
    useCashInStore(
      (state) => state.loading
    );

  useEffect(() => {
    fetchCashIn(businessId);
  }, [
    businessId,
    fetchCashIn,
  ]);

  const cards = [
    {
      title: "Total Pemasukan",
      value: summary.totalIncome,
      icon: Wallet,
      color: "bg-emerald-600",
    },
    {
      title: "Hari Ini",
      value: summary.todayIncome,
      icon: CalendarDays,
      color: "bg-green-500",
    },
    {
      title: "Bulan Ini",
      value: summary.monthIncome,
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