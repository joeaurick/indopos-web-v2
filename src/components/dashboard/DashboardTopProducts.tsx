"use client";

import { Trophy } from "lucide-react";

import { AppCard } from "@/components/ui";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardTopProducts() {
  const products = useDashboardStore(
    (state) => state.data.topProducts
  );

  const maxSold =
    products.length > 0
      ? Math.max(
          ...products.map(
            (item) => item.sold
          )
        )
      : 1;

  return (
    <AppCard className="p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Top Selling Product
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Produk paling laris berdasarkan transaksi.
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
            bg-amber-100
            text-amber-600
          "
        >
          <Trophy size={22} />
        </div>

      </div>

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
      border-[var(--border)]
      bg-slate-50/50
    "
  >

    <Trophy
      size={52}
      className="mb-5 text-slate-300"
    />

    <h3 className="text-lg font-semibold text-slate-700">
      Belum ada penjualan
    </h3>

    <p className="mt-2 max-w-xs text-center text-sm text-slate-500">
      Produk terlaris akan muncul setelah transaksi pertama dilakukan.
    </p>

  </div>

)}

      <div className="space-y-5">

        {products.map((item, index) => {

  const percent =
    (item.sold / maxSold) * 100;

  return (

    <div
      key={item.id}
      className="
        group
        overflow-hidden
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

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-4 min-w-0">

          {/* Ranking */}

          <div
            className={`
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              text-lg
              font-bold
              text-white
              shadow-lg

              ${
                index === 0
                  ? "bg-gradient-to-br from-amber-400 to-orange-500"
                  : index === 1
                  ? "bg-gradient-to-br from-slate-400 to-slate-600"
                  : index === 2
                  ? "bg-gradient-to-br from-orange-500 to-amber-700"
                  : "bg-gradient-to-br from-teal-500 to-cyan-600"
              }
            `}
          >
            #{index + 1}
          </div>

          <div className="min-w-0">

            <h3 className="truncate text-lg font-semibold">
              {item.name}
            </h3>

            <div className="mt-2 flex flex-wrap gap-2">

              <span
                className="
                  rounded-full
                  bg-emerald-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-700
                "
              >
                {item.sold} Terjual
              </span>

              {index === 0 && (
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
                  👑 Best Seller
                </span>
              )}

            </div>

          </div>

        </div>

        <div className="text-right shrink-0">

          <p className="text-xs text-slate-500">
            Revenue
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Rp{" "}
            {item.revenue.toLocaleString("id-ID")}
          </h2>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-5">

        <div className="mb-2 flex justify-between text-xs text-slate-500">

          <span>Performance</span>

          <span>{percent.toFixed(0)}%</span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">

          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-emerald-500
              to-teal-600
              transition-all
              duration-700
            "
            style={{
              width: `${percent}%`,
            }}
          />

        </div>

      </div>

    </div>

  );

})}

      </div>

    </AppCard>
  );
}