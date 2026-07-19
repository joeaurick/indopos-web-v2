"use client";

import { useRouter } from "next/navigation";

import { AppButton } from "@/components/ui";

export function DashboardActions() {
  const router = useRouter();

  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-3

        sm:flex-row
        xl:w-[240px]
        xl:flex-col
      "
    >
      <AppButton
        className="h-12 w-full"
        onClick={() => router.push("/pos")}
      >
        + Penjualan Baru
      </AppButton>

      <AppButton
        variant="secondary"
        className="h-12 w-full"
        onClick={() => router.push("/cash-in")}
      >
        + Cash In
      </AppButton>

      <AppButton
        variant="outline"
        className="h-12 w-full"
        onClick={() => router.push("/cash-out")}
      >
        + Cash Out
      </AppButton>
    </div>
  );
}