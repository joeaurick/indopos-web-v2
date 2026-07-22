"use client";

import { useEffect } from "react";

import {
  DollarSign,
  Wallet,
  TrendingUp,
  Receipt,
} from "lucide-react";

import { StatCard } from "./StatCard";

import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardStats() {
  const fetchDashboard =
    useDashboardStore(
      (state) => state.fetchDashboard
    );

  const summary =
    useDashboardStore(
      (state) => state.data.summary
    );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Income Hari Ini"
        value={`Rp ${Number(
          summary.todayIncome ?? 0
        ).toLocaleString("id-ID")}`}
        icon={<DollarSign size={22} />}
        color="#0F766E"
      />

      <StatCard
        title="Expense Hari Ini"
        value={`Rp ${Number(
          summary.todayExpense ?? 0
        ).toLocaleString("id-ID")}`}
        icon={<Wallet size={22} />}
        color="#EA580C"
      />

      <StatCard
        title="Laba Bersih"
        value={`Rp ${Number(
          summary.todayProfit ?? 0
        ).toLocaleString("id-ID")}`}
        icon={<TrendingUp size={22} />}
        color="#2563EB"
      />

      <StatCard
        title="Transaksi"
        value={Number(
          summary.todayTransactions ?? 0
        ).toLocaleString("id-ID")}
        icon={<Receipt size={22} />}
        color="#7C3AED"
      />

    </div>
  );
}