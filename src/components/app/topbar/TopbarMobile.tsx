"use client";

import { Bell } from "lucide-react";

export function TopbarMobile() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-[var(--border)]
        bg-white/95
        px-4
        pt-safe
        py-3
        backdrop-blur-xl
        md:hidden
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

        </div>

        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
          "
        >
          <Bell size={20} />
        </button>

      </div>
    </header>
  );
}