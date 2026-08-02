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
        color: "#16A34A",
        bg: "bg-emerald-50",
      };

    case "PURCHASE":
      return {
        title: "Purchasing",
        icon: ShoppingBasket,
        color: "#343C67",
        bg: "bg-[#EEF1FF]",
      };

    case "EXPENSE":
      return {
        title: "Cash Out",
        icon: WalletCards,
        color: "#DC2626",
        bg: "bg-red-50",
      };

    case "CASH_IN":
      return {
        title: "Cash In",
        icon: HandCoins,
        color: "#0891B2",
        bg: "bg-cyan-50",
      };

    default:
      return {
        title: "Aktivitas",
        icon: RefreshCcw,
        color: "#64748B",
        bg: "bg-slate-100",
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

  <div className="mb-6 flex items-center justify-between">

  <div>

    <h2 className="text-xl font-bold text-slate-900">
      Aktivitas Terbaru
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      5 aktivitas terakhir bisnis Anda.
    </p>

  </div>

  <button
    className="
      rounded-xl
      border
      border-slate-200
      px-4
      py-2
      text-sm
      font-medium
      transition
      hover:bg-slate-50
    "
  >
    Lihat Semua
  </button>

</div>

  {activities.length === 0 ? (

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

    bg-slate-50/50
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

    <ClipboardCheck
      size={24}
      className="text-slate-400"
    />

  </div>

  <h3
    className="
      text-base
      font-semibold
      text-slate-800
    "
  >
    Belum ada aktivitas
  </h3>

  <p
    className="
      mt-2

      text-sm

      text-slate-500
    "
  >
    Aktivitas terbaru akan muncul di sini.
  </p>

</div>

  ) : (

    <div>

  <div className="space-y-4">

        {activities.map((item) => {

          const activity =
            getActivity(item.reference_type);

          const Icon = activity.icon;

          return (

            <div
  key={item.id}
  className="
    flex
    items-start
    gap-4

    rounded-3xl

    border
    border-slate-200

    bg-white

    p-6

    transition
    duration-200

    hover:shadow-md
  "
>

              {/* Timeline Icon */}

              <div
  className={`
    flex
    h-11
    w-11
    shrink-0
    items-center
    justify-center

    rounded-2xl

    ${activity.bg}
  `}
>

  <Icon
    size={20}
    color={activity.color}
  />

</div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3
  className="
    text-base
    font-semibold
    text-slate-900
  "
>
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

      ${
        item.reference_type === "SALE"
          ? "bg-emerald-100 text-emerald-700"
          : item.reference_type === "PURCHASE"
          ? "bg-[#EEF1FF] text-[#343C67]"
          : item.reference_type === "EXPENSE"
          ? "bg-red-100 text-red-700"
          : item.reference_type === "CASH_IN"
          ? "bg-cyan-100 text-cyan-700"
          : "bg-slate-100 text-slate-700"
      }
    `}
  >
    {activity.title}
  </span>

</div>

                    

                    </div>

                    <p
  className="
    mt-3

    break-words

    text-sm
    leading-6

    text-slate-500
  "
>
                      {item.note || "-"}
                    </p>

                  </div>
                
                </div>
<p
  className="
    mt-2

    text-xs

    text-slate-400
  "
>
  {relativeTime(item.created_at)}
</p>
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