import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { AppLayout } from "@/components/layout/AppLayout";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { DashboardTopProducts } from "@/components/dashboard/DashboardTopProducts";
import { DashboardPaymentMethod } from "@/components/dashboard/DashboardPaymentMethod";
import { DashboardInventoryAlert } from "@/components/dashboard/DashboardInventoryAlert";
import { DashboardHeroStats } from "@/components/dashboard/DashboardHeroStats";

import { AppButton } from "@/components/ui";

import {
  CalendarDays,
  ShoppingCart,
  Package,
  CircleDollarSign,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppLayout>
      {/* HERO */}

      <div
        className="
          mb-8
          overflow-hidden
          rounded-[32px]
          border
          border-[var(--border)]
          bg-[var(--card)]
          p-8
          shadow-sm
        "
      >
        <div
  className="
  mb-6
  overflow-hidden
  rounded-2xl
  md:rounded-[32px]

  border
  border-[var(--border)]

  bg-[var(--card)]

  p-5
  md:p-8

  shadow-sm
"
>

          {/* LEFT */}

          <div className="min-w-0 flex-1">

            <div
  className="
    flex
    items-center
    gap-2

    text-xs
    md:text-sm

    text-[var(--text-muted)]
  "
>

              <CalendarDays size={16} />

              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}

            </div>

            <h1
  className="
    mt-2
    text-3xl
    md:text-4xl
    font-bold
    tracking-tight
  "
>
              Dashboard
            </h1>

            <p
  className="
    mt-3
    max-w-2xl

    text-sm
    md:text-[15px]

    leading-6

    text-[var(--text-muted)]
  "
>
              Selamat datang kembali di IndoPOS.
              Pantau seluruh aktivitas bisnis Anda secara real-time.
            </p>

            <DashboardHeroStats />

          </div>

          {/* RIGHT */}

<div
  className="
    flex
    flex-wrap
    gap-3
    xl:flex-col
    xl:w-[240px]
  "
>

  <AppButton className="
h-11
px-5
xl:w-full
">
    + Penjualan Baru
  </AppButton>

  <AppButton
    variant="secondary"
    className="h-12 w-full"
  >
    + Cash In
  </AppButton>

  <AppButton
    variant="outline"
    className="h-12 w-full"
  >
    + Cash Out
  </AppButton>

</div>

        </div>

      </div>

      <DashboardStats />

<div
  className="
    mt-6
    grid
    gap-4
    md:gap-6

    xl:grid-cols-3
  "
>

  <div className="xl:col-span-2">
    <DashboardChart />
  </div>

  <DashboardActivity />

</div>

<div
  className="
    mt-6
    grid
    gap-4
    md:gap-6

    xl:grid-cols-2
  "
>

  <DashboardTopProducts />

  <DashboardInventoryAlert />

</div>

<div className="mt-6 grid gap-6 xl:grid-cols-2">

  <DashboardPaymentMethod />


</div>

    </AppLayout>
  );
}