"use client";

import { useState, useRef, useEffect } from "react";

import {
  ChevronDown,
  LogOut,
  ShieldCheck,
  Building2,
  Sparkles,
  CircleCheckBig,
} from "lucide-react";

import { logout } from "@/lib/auth/logout";
import { useBusinessStore } from "@/features/settings";

export function TopbarProfile() {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const {
    business,
    fetchBusiness,
  } = useBusinessStore();

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      {/* BUTTON */}

      <button
  onClick={() => setOpen(!open)}
  className="
    group
    flex
    h-10
    items-center
    gap-3

    rounded-xl

    border
    border-[var(--border)]

    bg-white

    px-3

    transition-all

    hover:border-[var(--primary)]
    hover:bg-[var(--hover)]
  "
>
  <div
    className="
      flex
      h-8
      w-8
      items-center
      justify-center

      rounded-full

      bg-[var(--primary)]

      text-sm
      font-semibold
      text-white
    "
  >
    {(business?.name?.charAt(0) ?? "A").toUpperCase()}
  </div>

  <div className="hidden lg:block text-left">
    <p className="text-sm font-semibold leading-none">
      Administrator
    </p>

    <p className="mt-1 text-xs text-slate-500">
      Super Admin
    </p>
  </div>

  <ChevronDown
    size={16}
    className="
      text-slate-400
      transition-transform
      group-hover:rotate-180
    "
  />
</button>

      {open && (

        <div
  className="
    absolute
    right-0
    mt-3

    w-80

    overflow-hidden

    rounded-2xl

    border
    border-[var(--border)]

    bg-white

    shadow-lg
  "
>

          {/* HEADER */}

          <div
  className="
    border-b
    border-[var(--border)]

    px-5
    py-5
  "
>
  <div className="flex items-center gap-3">

    <div
      className="
        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-full

        bg-[var(--primary)]

        text-lg
        font-semibold
        text-white
      "
    >
      {(business?.name?.charAt(0) ?? "A").toUpperCase()}
    </div>

    <div>

      <h3 className="font-semibold">
        Administrator
      </h3>

      <p className="text-sm text-slate-500">
        Super Admin
      </p>

      <p className="text-xs text-slate-400 mt-1">
        {business?.name ?? "IndoPOS"}
      </p>

    </div>

  </div>
</div>

          {/* QUICK INFO */}

          <div className="space-y-4 p-5">

            <InfoCard
              icon={
                Building2
              }
              title="Business"
              value={
                business?.name ??
                "-"
              }
            />

            <InfoCard
              icon={
                ShieldCheck
              }
              title="Role"
              value="Super Administrator"
            />

            <InfoCard
              icon={
                CircleCheckBig
              }
              title="Status"
              value="Active"
            />

            <InfoCard
              icon={
                Sparkles
              }
              title="Subscription"
              value="Enterprise"
            />

          </div>

          <div className="border-t border-[var(--border)] p-4">

  <button
    onClick={logout}
    className="
      flex
      w-full
      items-center
      justify-center
      gap-2

      rounded-xl

      border
      border-red-200

      bg-red-50

      py-2.5

      font-medium

      text-red-600

      transition-all

      hover:bg-red-600
      hover:text-white
    "
  >
    <LogOut size={18} />

    Logout
  </button>

</div>

        </div>

      )}

    </div>
  );
}

type InfoProps = {
  icon: any;
  title: string;
  value: string;
};

function InfoCard({
  icon: Icon,
  title,
  value,
}: InfoProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        rounded-xl

        px-3
        py-2

        transition-colors

        hover:bg-slate-50
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-lg

          bg-slate-100
        "
      >
        <Icon
          size={18}
          className="text-[var(--primary)]"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="truncate text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}