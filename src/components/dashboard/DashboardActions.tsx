"use client";

import { useRouter } from "next/navigation";

import {
  ShoppingBasket,
  HandCoins,
  WalletCards,
} from "lucide-react";

import { AppButton } from "@/components/ui";

export function DashboardActions() {
  const router = useRouter();

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-3
        xl:grid-cols-1
        xl:w-[280px]
      "
    >
      <AppButton
        onClick={() =>
          router.push("/pos")
        }
        className="
          group
          flex
          h-16
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-emerald-600
          to-teal-600
          text-base
          font-semibold
          shadow-lg
          shadow-emerald-200/60
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <ShoppingBasket
          size={22}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        <span>Penjualan Baru</span>
      </AppButton>

      <AppButton
        onClick={() =>
          router.push("/cash-in")
        }
        className="
          group
          flex
          h-16
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-sky-600
          text-base
          font-semibold
          text-white
          shadow-lg
          shadow-cyan-200/60
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <HandCoins
          size={22}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        <span>Cash In</span>
      </AppButton>

      <AppButton
        onClick={() =>
          router.push("/cash-out")
        }
        className="
          group
          flex
          h-16
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-rose-500
          to-red-600
          text-base
          font-semibold
          text-white
          shadow-lg
          shadow-red-200/60
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <WalletCards
          size={22}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        <span>Cash Out</span>
      </AppButton>
    </div>
  );
}