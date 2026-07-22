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
        group
        relative
        flex
        items-center
        overflow-hidden
        rounded-2xl
        transition-all
        duration-300

        ${
          collapsed
            ? `
              mx-auto
              h-14
              w-14
              justify-center
            `
            : `
              h-14
              gap-4
              px-4
            `
        }

        ${
          active
            ? `
              bg-gradient-to-r
              from-[var(--primary)]
              via-[var(--primary)]
              to-emerald-500
              text-white
              shadow-lg
              shadow-emerald-200/60
              scale-[1.02]
            `
            : `
              text-slate-600
              hover:bg-white
              hover:text-slate-900
              hover:shadow-md
              hover:scale-[1.01]
            `
        }
      `}
    >
      {/* Glow */}

      {active && (
        <div
          className="
            absolute
            inset-0
            bg-white/10
          "
        />
      )}

      {/* Icon */}

      <div
        className={`
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          transition-all
          duration-300

          ${
            active
              ? `
                bg-white/20
                backdrop-blur-sm
              `
              : `
                bg-slate-100
                group-hover:bg-[var(--primary)]
              `
          }
        `}
      >
        <Icon
          size={20}
          className={`
            transition-all
            duration-300

            ${
              active
                ? "text-white"
                : "text-slate-500 group-hover:text-white"
            }
          `}
        />
      </div>

      {!collapsed && (
        <span
          className={`
            relative
            flex-1
            truncate
            text-[14px]

            ${
              active
                ? "font-semibold text-white"
                : "font-medium"
            }
          `}
        >
          {title}
        </span>
      )}

      {/* Active Dot */}

      {!collapsed && active && (
        <span
          className="
            relative
            h-2.5
            w-2.5
            rounded-full
            bg-white
            shadow
          "
        />
      )}
    </Link>
  );
}