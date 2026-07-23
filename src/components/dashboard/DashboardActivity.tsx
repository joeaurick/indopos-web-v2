"use client";

import {
  HandCoins,
  ShoppingBasket,
  WalletCards,
  ClipboardCheck,
  RefreshCcw,
} from "lucide-react";

import { AppCard } from "@/components/ui";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

function getActivity(type: string) {
  switch (type) {
    case "SALE":
      return {
        title: "Penjualan",
        icon: ClipboardCheck,
        color:
          "from-emerald-500 to-emerald-600",
      };

    case "PURCHASE":
      return {
        title: "Purchase",
        icon: ShoppingBasket,
        color:
          "from-blue-500 to-indigo-600",
      };

    case "EXPENSE":
      return {
        title: "Cash Out",
        icon: WalletCards,
        color:
          "from-rose-500 to-red-600",
      };

    case "CASH_IN":
      return {
        title: "Cash In",
        icon: HandCoins,
        color:
          "from-cyan-500 to-sky-600",
      };

    default:
      return {
        title: "Activity",
        icon: RefreshCcw,
        color:
          "from-slate-500 to-slate-700",
      };
  }
}

export function DashboardActivity() {
  const activities =
    useDashboardStore(
      (state) =>
        state.data.activities
    );

  return (
    <AppCard className="flex h-auto min-h-[520px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-8">

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Activity Timeline
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Aktivitas terbaru seluruh sistem.
        </p>

      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">

        {activities.length === 0 && (

          <div className="flex h-72 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200">

            <ClipboardCheck
              size={46}
              className="mb-4 text-slate-300"
            />

            <h3 className="font-semibold text-slate-700">
              Belum ada aktivitas
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Timeline akan muncul di sini.
            </p>

          </div>

        )}

        {activities.map((item) => {

          const activity =
            getActivity(
              item.reference_type
            );

          const Icon =
            activity.icon;

          return (

            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >

              <div className="absolute left-10 top-0 bottom-0 w-px bg-slate-100" />

              <div className="relative flex items-start gap-4">

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${activity.color} text-white shadow-lg`}
                >
                  <Icon
                    size={22}
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {
                          activity.title
                        }
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.note ||
                          "-"}
                      </p>

                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      {new Date(
                        item.created_at
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </AppCard>
  );
}