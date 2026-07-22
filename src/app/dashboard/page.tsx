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
import { DashboardActions } from "@/components/dashboard/DashboardActions";
import { DashboardLoader } from "@/components/dashboard/DashboardLoader";
import { getCurrentBusinessId } from "@/lib/business/get-current-business";

import {
  CalendarDays,
  ShoppingCart,
  Package,
  CircleDollarSign,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const businessId = await getCurrentBusinessId();

if (!businessId) {
  redirect("/login");
}

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppLayout>

  <DashboardLoader businessId={businessId} />

  {/* HERO */}

      <div
  className="
    mb-6
    rounded-3xl
    border
    border-[var(--border)]
    bg-[var(--card)]
    p-5
    shadow-sm

    lg:p-8
  "
>
  <div
    className="
      flex
      flex-col
      gap-8

      xl:flex-row
      xl:items-start
      xl:justify-between
    "
  >
    {/* LEFT */}

    <div className="min-w-0 flex-1">

      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">

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
          mt-3
          text-3xl
          font-bold
          tracking-tight

          lg:text-5xl
        "
      >
        Dashboard
      </h1>

      <p
        className="
          mt-3
          max-w-3xl
          text-sm
          leading-7
          text-[var(--text-muted)]

          lg:text-base
        "
      >
        Selamat datang kembali di IndoPOS.
        Pantau seluruh aktivitas bisnis Anda secara real-time.
      </p>

      <div className="mt-6">
        <DashboardHeroStats />
      </div>

    </div>

    {/* RIGHT */}

    <DashboardActions />

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

<div className="h-20 md:hidden" />
    </AppLayout>
  );
}