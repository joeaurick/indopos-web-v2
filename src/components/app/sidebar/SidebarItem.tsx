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
    (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      title={collapsed ? title : undefined}
      className={`
        group
        relative
        flex
        items-center

        transition-all
        duration-200

        ${
          collapsed
            ? `
              mx-auto
              h-12
              w-12
              justify-center
              rounded-2xl
            `
            : `
              h-12
              gap-3
              rounded-2xl
              px-4
            `
        }

        ${
          active
            ? `
              bg-[#2D2D2D]
              text-white
              shadow-sm
            `
            : `
              text-gray-300
              hover:bg-[#242424]
              hover:text-white
            `
        }
      `}
    >
      {/* Active Indicator */}

      {!collapsed && active && (
        <span
          className="
            absolute
            left-2
            top-3
            bottom-3
            w-1
            rounded-full
            bg-white
          "
        />
      )}

      {/* Icon */}

      <Icon
        size={20}
        className={`
          shrink-0
          transition-colors
          duration-200

          ${
            active
              ? "text-white"
              : "text-gray-300 group-hover:text-white"
          }
        `}
      />

      {!collapsed && (
        <span
          className={`
            flex-1
            truncate
            text-[15px]
            transition-colors
            duration-200

            ${
              active
                ? "font-semibold text-white"
                : "font-medium text-gray-300 group-hover:text-white"
            }
          `}
        >
          {title}
        </span>
      )}
    </Link>
  );
}