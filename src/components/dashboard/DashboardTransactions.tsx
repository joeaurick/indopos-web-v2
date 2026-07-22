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
          <p className="text-[var(--text-muted)]">
            Memuat data...
          </p>
        ) : transactions.length === 0 ? (
          <p className="text-[var(--text-muted)]">
            Belum ada transaksi.
          </p>
        ) : (
          transactions.map((item) => {
            const type =
              getType(item.type);

            const Icon =
              type.icon;

            return (
              <div
                key={`${item.type}-${item.id}`}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-4
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-md
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
                      text-white
                      ${type.color}
                    `}
                  >
                    <Icon size={20} />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {type.label}
                    </h4>

                    <p className="text-sm text-[var(--text-muted)]">
                      {item.invoice}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {new Date(
                        item.created_at
                      ).toLocaleString("id-ID")}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-lg font-bold">
                    Rp{" "}
                    {Number(
                      item.total
                    ).toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </div>

              </div>
            );
          })
        )}

      </div>

    </Card>
  );
}