"use client";

import {
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
        z-30

        hidden
        md:flex

        h-16

        items-center
        justify-end

        border-b
        border-[var(--border)]

        bg-white/95
        backdrop-blur-md

        px-4
        lg:px-8
      "
    >
      <div className="flex items-center gap-2">

        <div className="hidden lg:block">
          <TopbarClock />
        </div>

        <TopbarIconButton>
          <Bell size={18} />
        </TopbarIconButton>

        <TopbarIconButton>
          <Settings size={18} />
        </TopbarIconButton>

        <TopbarIconButton>
          <Moon size={18} />
        </TopbarIconButton>

        <TopbarProfile />

      </div>
    </header>
  );
}

function TopbarIconButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      className="
        flex
        h-9
        w-9
        items-center
        justify-center

        rounded-xl

        border
        border-[var(--border)]

        bg-white

        text-slate-600

        transition-all

        hover:border-[var(--primary)]
        hover:bg-[var(--hover)]
        hover:text-[var(--primary)]
      "
    >
      {children}
    </button>
  );
}