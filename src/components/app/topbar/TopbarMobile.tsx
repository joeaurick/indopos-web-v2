"use client";

import { useEffect } from "react";
import { Bell } from "lucide-react";

import { useBusinessStore } from "@/features/settings";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 11) {
    return "☀️ Selamat Pagi";
  }

  if (hour < 15) {
    return "🌤️ Selamat Siang";
  }

  if (hour < 18) {
    return "🌇 Selamat Sore";
  }

  return "🌙 Selamat Malam";
}

export function TopbarMobile() {
  const {
    business,
    fetchBusiness,
  } = useBusinessStore();

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-[var(--border)]
        bg-white/95
        backdrop-blur-xl
        md:hidden
      "
    >
      <div className="flex items-center justify-between px-4 py-4">

        {/* LEFT */}

        <div className="flex min-w-0 items-center gap-3">

          {business?.logo_url ? (
            <img
              src={business.logo_url}
              alt="Logo"
              className="
                h-12
                w-12
                rounded-2xl
                border
                object-cover
                shadow-sm
              "
            />
          ) : (
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-teal-500
                to-emerald-600
                text-lg
                font-bold
                text-white
              "
            >
              {(business?.name?.charAt(0) ?? "I").toUpperCase()}
            </div>
          )}

          <div className="min-w-0">

            <p className="text-xs font-medium text-teal-600">
              {getGreeting()}
            </p>

            <h2 className="truncate text-lg font-bold text-slate-900">
              {business?.name || "IndoPOS"}
            </h2>

            <p className="truncate text-xs text-slate-500">
              {business?.business_type || "Business"}
            </p>

          </div>

        </div>

        {/* RIGHT */}

{/* RIGHT */}

<div
  className="
    relative
    flex
    h-12
    w-12
    items-center
    justify-center
    overflow-hidden
    rounded-2xl
    shadow-lg
  "
>
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-br
      from-emerald-400
      via-teal-500
      to-cyan-500
    "
  />

  <div
    className="
      absolute
      -top-4
      -right-4
      h-10
      w-10
      rounded-full
      bg-white/30
      blur-xl
    "
  />

  <div
    className="
      absolute
      -bottom-4
      -left-4
      h-8
      w-8
      rounded-full
      bg-lime-300/40
      blur-xl
    "
  />

  <div
    className="
      relative
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-xl
      bg-white/90
      backdrop-blur-md
    "
  >
    <img
      src="/favicon.png"
      className="h-6 w-6"
    />
  </div>
</div>

      </div>
    </header>
  );
}