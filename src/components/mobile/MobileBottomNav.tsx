"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Boxes,
  Menu,
} from "lucide-react";

import { MobileMenuSheet } from "./MobileMenuSheet";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "POS",
    href: "/pos",
    icon: ShoppingCart,
  },
  {
    name: "Sales",
    href: "/sales",
    icon: Receipt,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
  className="
    fixed
    inset-x-0
    bottom-0
    z-50
    h-24
    md:hidden
    pb-[env(safe-area-inset-bottom)]
    border-t
    border-[var(--border)]
    bg-[var(--card)]/95
    backdrop-blur-xl
    shadow-[0_-8px_30px_rgba(0,0,0,.08)]
  "
>
        <div className="grid h-full grid-cols-5">

          {menus.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="
  flex
  h-full
  flex-col
  items-center
  justify-center
  gap-1
"
              >
                <Icon
                  size={20}
                  className={
                    active
                      ? "text-[var(--primary)]"
                      : "text-slate-400"
                  }
                />

                <span
                  className={`mt-1 text-[11px] ${
                    active
                      ? "font-semibold text-[var(--primary)]"
                      : "text-slate-500"
                  }`}
                >
                  {item.name}
                </span>

              </Link>
            );

          })}

          <button
            onClick={() => setOpen(true)}
            className="
  flex
  h-full
  flex-col
  items-center
  justify-center
  gap-1
"
          >
            <Menu
              size={20}
              className="text-slate-400"
            />

            <span className="mt-1 text-[11px] text-slate-500">
              Menu
            </span>

          </button>

        </div>
      </div>

      <MobileMenuSheet
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}