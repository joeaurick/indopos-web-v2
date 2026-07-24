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

  const percent = Math.min(
    (item.stock / item.minimum_stock) * 100,
    100
  );

  const critical =
    item.stock <= item.minimum_stock * 0.3;

  const warning =
    item.stock > item.minimum_stock * 0.3 &&
    item.stock <= item.minimum_stock;

  return (

    <div
      key={item.id}
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

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-red-500
              to-orange-500
              text-white
              shadow-lg
              transition-transform
              duration-300
              group-hover:scale-110
            "
          >
            <Package size={24} />
          </div>

          <div>

            <h3 className="text-lg font-semibold">
              {item.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Minimum Stock {item.minimum_stock}
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="text-left lg:text-right">

          <div className="text-3xl font-bold text-red-600">
            {item.stock}
          </div>

          <div className="mt-2">

            {critical && (
              <span
                className="
                  rounded-full
                  bg-red-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-red-700
                "
              >
                Critical
              </span>
            )}

            {warning && (
              <span
                className="
                  rounded-full
                  bg-amber-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-amber-700
                "
              >
                Warning
              </span>
            )}

            {!critical && !warning && (
              <span
                className="
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-green-700
                "
              >
                Safe
              </span>
            )}

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-5">

        <div className="mb-2 flex justify-between text-xs text-slate-500">

          <span>Stock Level</span>

          <span>{percent.toFixed(0)}%</span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-700

              ${
                critical
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : warning
                  ? "bg-gradient-to-r from-amber-400 to-orange-500"
                  : "bg-gradient-to-r from-green-500 to-emerald-600"
              }
            `}
            style={{
              width: `${percent}%`,
            }}
          />

        </div>

      </div>

    </div>

  );

})}

        {products.length === 0 && (

  <div
    className="
      flex
      h-72
      flex-col
      items-center
      justify-center
      rounded-3xl
      border-2
      border-dashed
      border-green-300
      bg-green-50/50
    "
  >

    <Package
      size={52}
      className="mb-5 text-green-500"
    />

    <h3 className="text-lg font-semibold text-green-700">
      Semua stok masih aman
    </h3>

    <p className="mt-2 max-w-xs text-center text-sm text-green-600">
      Tidak ada produk yang memerlukan restock saat ini.
    </p>

  </div>

)}

      </div>

    </AppCard>
  );
}