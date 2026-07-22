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
    left-4
    right-4
    bottom-4
    z-50
    h-20
    md:hidden

    rounded-full

    border
    border-white/70

    bg-white/85

    backdrop-blur-2xl

    shadow-[0_18px_40px_rgba(15,23,42,.16)]

    pb-[env(safe-area-inset-bottom)]
  "
>
        <div className="grid h-full grid-cols-5 items-center px-2">

          {menus.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
flex
h-14
flex-col
items-center
justify-center
rounded-2xl
transition-all
duration-200
active:scale-95

${
active
? "bg-teal-50 text-[var(--primary)]"
: "hover:bg-slate-100"
}
`}
              >
                <Icon
                  size={22}
                  className={
                    active
? "text-[var(--primary)]"
: "text-slate-500"
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
h-14
flex-col
items-center
justify-center
rounded-2xl
transition
hover:bg-slate-100
active:scale-95
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