"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
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
    name: "Bookkeeping",
    href: "/bookkeeping",
    icon: BookOpen,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
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
          bottom-0
          left-0
          right-0
          z-50

          md:hidden

          border-t
          border-gray-200

          bg-white

          pb-[env(safe-area-inset-bottom)]

          shadow-[0_-4px_18px_rgba(0,0,0,.06)]
        "
      >
        <div
          className="
            grid
            h-[72px]
            grid-cols-4
          "
        >
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
                  flex-col
                  items-center
                  justify-center
                  gap-1
                "
              >
                <Icon
                  size={22}
                  className={
                    active
                      ? "text-[#343C67]"
                      : "text-gray-400"
                  }
                />

                <span
                  className={`text-[11px] ${
                    active
                      ? "font-semibold text-[#343C67]"
                      : "text-gray-500"
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
              flex-col
              items-center
              justify-center
              gap-1
            "
          >
            <Menu
              size={22}
              className="text-gray-400"
            />

            <span className="text-[11px] text-gray-500">
              More
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