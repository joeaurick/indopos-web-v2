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
    hidden
    md:flex
    sticky
    top-0
    z-30
    h-20
    items-center
    justify-end
    border-b
    border-[var(--border)]
    bg-[var(--card)]/90
    px-4
    lg:px-8
    backdrop-blur-xl
  "
>
      {/* LEFT di hapus dulu */}

  

      {/* RIGHT */}

      <div className="flex items-center gap-2 lg:gap-3">

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