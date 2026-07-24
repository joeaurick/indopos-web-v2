"use client";

import {
  HandCoins,
  ShoppingBasket,
  WalletCards,
  ClipboardCheck,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";

import { AppCard } from "@/components/ui";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";
import { relativeTime } from "@/lib/utils/relative-time";


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

function getBadgeColor(type: string) {
  switch (type) {
    case "SALE":
      return "bg-emerald-100 text-emerald-700";

    case "PURCHASE":
      return "bg-blue-100 text-blue-700";

    case "EXPENSE":
      return "bg-red-100 text-red-700";

    case "CASH_IN":
      return "bg-cyan-100 text-cyan-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function DashboardActivity() {
  const activities =
    useDashboardStore(
      (state) =>
        state.data.activities
    );

  return (
    <AppCard className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">

  <div className="mb-8 flex items-center justify-between">

  <div>

    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
      Activity Timeline
    </h2>

    <p className="mt-2 text-sm text-slate-500">
      Aktivitas terbaru seluruh sistem.
    </p>

  </div>

  <button
    className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-slate-200
      px-4
      py-2
      text-sm
      font-medium
      transition
      hover:bg-slate-100
    "
  >
    View All

    <ArrowRight size={16} />
  </button>

</div>

  {activities.length === 0 ? (

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
        border-slate-200
      "
    >

      <ClipboardCheck
        size={50}
        className="mb-4 text-slate-300"
      />

      <h3 className="font-semibold text-slate-700">
        Belum ada aktivitas
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Timeline aktivitas akan muncul di sini.
      </p>

    </div>

  ) : (

    <div className="relative">

      <div
        className="
          absolute
          left-6
          top-2
          bottom-2
          w-px
          bg-slate-200
        "
      />

      <div className="space-y-5">

        {activities.map((item) => {

          const activity =
            getActivity(item.reference_type);

          const Icon = activity.icon;

          return (

            <div
  key={item.id}
  className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-teal-300
    hover:shadow-2xl
  "
>

              {/* Timeline Icon */}

              <div
                className={`
                  relative
                  z-10
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${activity.color}
                  text-white
                  shadow-lg
                  transition-transform
                  duration-300
                  group-hover:scale-105
                `}
              >
                <Icon size={22} />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-semibold text-slate-900">
                        {activity.title}
                      </h3>
                      <div className="mt-2">
  <span
    className={`
      inline-flex
      rounded-full
      px-3
      py-1
      text-[11px]
      font-semibold
      uppercase

      ${
        item.reference_type === "SALE"
          ? "bg-emerald-100 text-emerald-700"
          : item.reference_type ===
            "EXPENSE"
          ? "bg-red-100 text-red-700"
          : item.reference_type ===
            "CASH_IN"
          ? "bg-cyan-100 text-cyan-700"
          : "bg-slate-100 text-slate-700"
      }
    `}
  >
    {item.reference_type}
  </span>
</div>

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
                        {item.reference_type}
                      </span>

                    </div>

                    <p className="mt-2 break-words text-sm text-slate-500">
                      {item.note || "-"}
                    </p>

                  </div>

                  <div
                    className="
                      self-start
                      rounded-full
                      bg-slate-100
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-slate-600
                      whitespace-nowrap
                    "
                  >
                    {relativeTime(item.created_at)}
                  </div>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  )}

</AppCard>
  );
}