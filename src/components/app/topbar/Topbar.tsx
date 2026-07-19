"use client";

import {
  Search,
  Bell,
  Settings,
  Moon,
} from "lucide-react";

import { TopbarProfile } from "./TopbarProfile";
import { TopbarClock } from "./TopbarClock";

export function Topbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        md:h-20
        shrink-0
        items-center
        justify-between
        border-b
        border-[var(--border)]
        bg-[var(--card)]/95
        px-4
        md:px-8
        backdrop-blur-xl
      "
    >
      {/* LEFT */}

      <div className="flex min-w-0 flex-1 items-center">

        <div className="relative w-full md:max-w-lg">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[var(--text-muted)]
            "
          />

          <input
            placeholder="Cari menu..."
            className="
              h-11
              md:h-12
              w-full
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--hover)]
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              duration-200
              focus:border-[var(--primary)]
              focus:bg-white
            "
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="ml-4 flex shrink-0 items-center gap-2 md:gap-3">

        {/* Clock hanya desktop */}

        <div className="hidden lg:block">
          <TopbarClock />
        </div>

        {/* Bell */}

        <button
          className="
            hidden
            md:flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            transition
            hover:bg-[var(--hover)]
          "
        >
          <Bell size={18} />
        </button>

        {/* Settings */}

        <button
          className="
            hidden
            md:flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            transition
            hover:bg-[var(--hover)]
          "
        >
          <Settings size={18} />
        </button>

        {/* Dark Mode */}

        <button
          className="
            hidden
            md:flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            transition
            hover:bg-[var(--hover)]
          "
        >
          <Moon size={18} />
        </button>

        {/* Profile tetap tampil */}

        <TopbarProfile />

      </div>

    </header>
  );
}