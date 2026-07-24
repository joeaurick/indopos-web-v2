"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  href: string;
  icon: LucideIcon;
  collapsed: boolean;
};

export function SidebarItem({
  title,
  href,
  icon: Icon,
  collapsed,
}: Props) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== "/" &&
      pathname.startsWith(href));

  return (
    <Link
      href={href}
      title={collapsed ? title : undefined}
      className={`
        relative
        flex
        items-center
        rounded-xl
        transition-all
        duration-200

        ${
          collapsed
            ? `
              mx-auto
              h-11
              w-11
              justify-center
            `
            : `
              h-11
              px-3
              gap-3
            `
        }

        ${
          active
            ? `
              bg-[var(--primary)]
              text-white
              shadow-sm
            `
            : `
              text-slate-600
              hover:bg-slate-100
              hover:text-slate-900
            `
        }
      `}
    >
      {/* Active Indicator */}

      {!collapsed && active && (
        <span
          className="
            absolute
            left-0
            top-2
            bottom-2
            w-1
            rounded-r-full
            bg-white
          "
        />
      )}

      {/* Icon */}

      <div
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          transition-colors

          ${
            active
              ? "bg-white/15"
              : "bg-transparent"
          }
        `}
      >
        <Icon
          size={18}
          className={
            active
              ? "text-white"
              : "text-slate-500"
          }
        />
      </div>

      {!collapsed && (
        <span
          className={`
            flex-1
            truncate
            text-sm

            ${
              active
                ? "font-semibold"
                : "font-medium"
            }
          `}
        >
          {title}
        </span>
      )}
    </Link>
  );
}