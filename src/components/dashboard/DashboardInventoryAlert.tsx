"use client";

import { useEffect } from "react";

import {
  AlertTriangle,
  Package,
} from "lucide-react";

import { AppCard } from "@/components/ui";

import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardInventoryAlert() {
  const fetchDashboard =
    useDashboardStore(
      (state) => state.fetchDashboard
    );

  const products =
    useDashboardStore(
      (state) =>
        state.data.lowStockProducts
    );

  return (
    <AppCard className="p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Inventory Alert
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Produk yang harus segera di-restock.
          </p>

        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-red-100
            text-red-600
          "
        >
          <AlertTriangle size={22} />
        </div>

      </div>

      <div className="space-y-5">

        {products.map((item) => {

          const percent =
            Math.min(
              (item.stock /
                item.minimum_stock) *
                100,
              100
            );

          return (

            <div
              key={item.id}
              className="
                rounded-2xl
                border
                border-[var(--border)]
                p-4
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-red-50
                      text-red-500
                    "
                  >
                    <Package size={18} />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {item.name}
                    </h4>

                    <p className="text-sm text-[var(--text-muted)]">
                      Minimum Stock {item.minimum_stock}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-xl font-bold text-red-600">
                    {item.stock}
                  </div>

                  <div className="text-xs text-[var(--text-muted)]">
                    Tersisa
                  </div>

                </div>

              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-red-500"
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

            </div>

          );
        })}

        {products.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-green-300
              bg-green-50
              p-8
              text-center
            "
          >
            <Package
              className="mx-auto mb-3 text-green-600"
              size={36}
            />

            <p className="font-semibold text-green-700">
              Semua stok masih aman
            </p>

          </div>
        )}

      </div>

    </AppCard>
  );
}