"use client";

import { useEffect } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  ShoppingBag,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardTransactions() {
  const fetchDashboard =
    useDashboardStore(
      (state) => state.fetchDashboard
    );

  const transactions =
    useDashboardStore(
      (state) =>
        state.data.recentTransactions
    );

  const loading =
    useDashboardStore(
      (state) => state.loading
    );

  function getType(type?: string) {
    switch (type) {
      case "SALE":
        return {
          icon: ShoppingBag,
          color: "bg-emerald-500",
          label: "Sale",
        };

      case "PURCHASE":
        return {
          icon: Receipt,
          color: "bg-orange-500",
          label: "Purchase",
        };

      case "CASH_IN":
        return {
          icon: ArrowDownLeft,
          color: "bg-blue-500",
          label: "Cash In",
        };

      case "EXPENSE":
        return {
          icon: ArrowUpRight,
          color: "bg-red-500",
          label: "Cash Out",
        };

      default:
        return {
          icon: Receipt,
          color: "bg-slate-500",
          label: "-",
        };
    }
  }

  return (
    <Card className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Aktivitas transaksi terbaru.
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {loading ? (
          <div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div
      key={i}
      className="
        h-28
        animate-pulse
        rounded-3xl
        bg-slate-100
      "
    />
  ))}
</div>
        ) : transactions.length === 0 ? (
          <div
  className="
    flex
    h-64
    flex-col
    items-center
    justify-center
    rounded-3xl
    border-2
    border-dashed
    border-slate-200
  "
>
  <Receipt
    size={46}
    className="mb-4 text-slate-300"
  />

  <h3 className="font-semibold text-slate-700">
    Belum ada transaksi
  </h3>

  <p className="mt-2 text-sm text-slate-500">
    Transaksi terbaru akan muncul di sini.
  </p>
</div>
        ) : (
          transactions.map((item) => {
  const type = getType(item.type);
  const Icon = type.icon;

  return (
    <div
      key={`${item.type}-${item.id}`}
      className="
        group
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-xl
      "
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT */}

        <div className="flex items-start gap-4">

          <div
            className={`
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              ${type.color}
              text-white
              shadow-lg
              transition-transform
              duration-300
              group-hover:scale-110
            `}
          >
            <Icon size={22} />
          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-semibold text-slate-900">
                {type.label}
              </h3>

              <span
                className="
                  rounded-full
                  bg-slate-100
                  px-2.5
                  py-1
                  text-[11px]
                  font-medium
                  text-slate-600
                "
              >
                {item.type}
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-500">
              Invoice
            </p>

            <p className="font-medium break-all">
              {item.invoice}
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="text-left md:text-right">

          <h2 className="text-xl font-bold text-slate-900">
            Rp{" "}
            {Number(item.total).toLocaleString(
              "id-ID"
            )}
          </h2>

          <div
            className="
              mt-2
              inline-flex
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              text-slate-600
            "
          >
            {new Date(
              item.created_at
            ).toLocaleString("id-ID")}
          </div>

        </div>

      </div>
    </div>
  );
})
        )}

      </div>

    </Card>
  );
}