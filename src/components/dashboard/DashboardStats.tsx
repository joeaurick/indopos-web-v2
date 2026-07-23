"use client";

import {
  HandCoins,
  WalletCards,
  BadgeDollarSign,
  ClipboardList,
} from "lucide-react";

import { StatCard } from "./StatCard";

import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardStats() {
  const summary =
    useDashboardStore(
      (state) => state.data.summary
    );

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Income Hari Ini"
        value={`Rp ${Number(
          summary.todayIncome ?? 0
        ).toLocaleString("id-ID")}`}
        icon={
          <HandCoins
            size={24}
            strokeWidth={2}
          />
        }
        color="#059669"
      />

      <StatCard
        title="Expense Hari Ini"
        value={`Rp ${Number(
          summary.todayExpense ?? 0
        ).toLocaleString("id-ID")}`}
        icon={
          <WalletCards
            size={24}
            strokeWidth={2}
          />
        }
        color="#DC2626"
      />

      <StatCard
        title="Laba Bersih"
        value={`Rp ${Number(
          summary.todayProfit ?? 0
        ).toLocaleString("id-ID")}`}
        icon={
          <BadgeDollarSign
            size={24}
            strokeWidth={2}
          />
        }
        color="#2563EB"
      />

      <StatCard
        title="Transaksi"
        value={Number(
          summary.todayTransactions ?? 0
        ).toLocaleString("id-ID")}
        icon={
          <ClipboardList
            size={24}
            strokeWidth={2}
          />
        }
        color="#7C3AED"
      />

    </div>
  );
}