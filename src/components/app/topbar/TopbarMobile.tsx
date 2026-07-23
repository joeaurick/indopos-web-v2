"use client";

import { useEffect } from "react";

import {
  ChevronRight,
  Circle,
} from "lucide-react";

import { useBusinessStore } from "@/features/settings";

export function TopbarMobile() {
  const {
    business,
    fetchBusiness,
  } = useBusinessStore();

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  const time = new Date().toLocaleTimeString(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-gradient-to-b
        from-slate-50
        to-white
        px-4
        pt-4
        pb-2
        md:hidden
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-5
          shadow-xl
          shadow-slate-200/60
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-gradient-to-br
            from-teal-400/15
            to-cyan-400/10
            blur-3xl
          "
        />

        {/* Header */}


        {/* Business */}

        <div className="relative mt-6 flex items-center gap-4">

          {business?.logo_url ? (

            <img
              src={business.logo_url}
              alt="Logo"
              className="
                h-16
                w-16
                rounded-3xl
                border
                border-slate-200
                object-cover
                shadow-md
              "
            />

          ) : (

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-teal-500
                via-emerald-500
                to-cyan-500
                text-2xl
                font-bold
                text-white
                shadow-lg
              "
            >
              {(business?.name?.charAt(0) ?? "I").toUpperCase()}
            </div>

          )}

          <div className="min-w-0 flex-1">

            <h1
              className="
                truncate
                text-xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              {business?.name ?? "IndoPOS"}
            </h1>

            <p
              className="
                mt-1
                truncate
                text-sm
                text-slate-500
              "
            >
              {business?.business_type ??
                "Business"}
            </p>

          </div>

        </div>

        {/* Footer */}

        <button
          className="
            relative
            mt-6
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            transition
            hover:bg-slate-100
          "
        >
          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-widest
                text-slate-400
              "
            >
              Workspace
            </p>

            <p
              className="
                mt-1
                font-semibold
                text-slate-800
              "
            >
              Business Management
            </p>

          </div>

          <ChevronRight
            size={20}
            className="text-slate-400"
          />

        </button>

      </div>

    </header>
  );
}