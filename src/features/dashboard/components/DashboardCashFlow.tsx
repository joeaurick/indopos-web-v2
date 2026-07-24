"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  TrendingUp,
} from "lucide-react";

import { AppCard } from "@/components/ui";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardCashFlow() {
  const summary = useDashboardStore(
    (state) => state.data.summary
  );

  const cashIn = summary.todayIncome ?? 0;
  const cashOut = summary.todayExpense ?? 0;
  const balance = cashIn - cashOut;

  return (
    <AppCard className="p-6">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Cash Flow
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Ringkasan pemasukan dan pengeluaran hari ini.
          </p>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-emerald-100
            text-emerald-600
          "
        >
          <Wallet size={24} />
        </div>

      </div>

      <div className="space-y-5">

        {/* Cash In */}

        <div
          className="
            group
            flex
            items-center
            justify-between
            rounded-3xl
            border
            border-[var(--border)]
            bg-white
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-100
                text-emerald-600
              "
            >
              <ArrowDownLeft size={24} />
            </div>

            <div>

              <p className="text-sm text-slate-500">
                Cash In
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                Rp {cashIn.toLocaleString("id-ID")}
              </h3>

            </div>

          </div>

          <TrendingUp
            size={22}
            className="text-emerald-500"
          />

        </div>

        {/* Cash Out */}

        <div
          className="
            group
            flex
            items-center
            justify-between
            rounded-3xl
            border
            border-[var(--border)]
            bg-white
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-100
                text-red-600
              "
            >
              <ArrowUpRight size={24} />
            </div>

            <div>

              <p className="text-sm text-slate-500">
                Cash Out
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                Rp {cashOut.toLocaleString("id-ID")}
              </h3>

            </div>

          </div>

        </div>

        {/* Balance */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-r
            from-[var(--primary)]
            to-emerald-500
            p-7
            text-white
          "
        >

          <div
            className="
              absolute
              -right-10
              -top-10
              h-40
              w-40
              rounded-full
              bg-white/10
            "
          />

          <p className="relative text-sm opacity-90">
            Saldo Kas
          </p>

          <h2 className="relative mt-3 text-4xl font-bold">
            Rp {balance.toLocaleString("id-ID")}
          </h2>

          <p className="relative mt-2 text-sm text-white/80">
            Cash In − Cash Out
          </p>

        </div>

      </div>

    </AppCard>
  );
}