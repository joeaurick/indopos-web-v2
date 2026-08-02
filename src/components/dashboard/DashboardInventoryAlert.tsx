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

      <div className="mb-6 flex items-center justify-between">

  <div>

    <h2 className="text-xl font-bold text-slate-900">
      Low Stock
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Produk yang perlu segera di-restock.
    </p>

  </div>

  <div
    className="
      flex
      h-11
      w-11
      items-center
      justify-center

      rounded-2xl

      bg-orange-50
    "
  >

    <AlertTriangle
      size={20}
      className="text-orange-600"
    />

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
rounded-3xl

border
border-slate-200

bg-white

p-5

transition
duration-200

hover:shadow-md
"
    >

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <div
  className="
    flex
    h-12
    w-12
    shrink-0
    items-center
    justify-center

    rounded-2xl

    bg-orange-50
  "
>

  <Package
    size={20}
    className="text-orange-600"
  />

</div>

          <div>

            <h3
  className="
    text-base
    font-semibold
    text-slate-900
  "
>
              {item.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Minimum Stock {item.minimum_stock}
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="text-left lg:text-right">

          <div
  className="
    text-2xl
    font-bold
    text-slate-900
  "
>
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

        <div
  className="
    h-2

    overflow-hidden

    rounded-full

    bg-slate-100
  "
>

          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-700

              ${
                critical
  ? "bg-red-500"
  : warning
  ? "bg-amber-500"
  : "bg-emerald-500"
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
    h-60
    flex-col
    items-center
    justify-center

    rounded-3xl

    border
    border-dashed
    border-slate-200

    bg-slate-50
  "
>

  <div
    className="
      mb-4

      flex
      h-14
      w-14
      items-center
      justify-center

      rounded-2xl

      bg-white

      shadow-sm
    "
  >

    <Package
      size={24}
      className="text-emerald-600"
    />

  </div>

  <h3
    className="
      text-base
      font-semibold
      text-slate-800
    "
  >
    Semua stok masih aman
  </h3>

  <p
    className="
      mt-2

      text-sm

      text-slate-500
    "
  >
    Belum ada produk yang perlu di-restock.
  </p>

</div>

)}

      </div>

    </AppCard>
  );
}