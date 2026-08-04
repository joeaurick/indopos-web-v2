"use client";

import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";

type Props = {
  title: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
};

export function DrawerItem({
  title,
  href,
  icon: Icon,
  active = false,
  onClick,
}: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        group
        flex
        items-center
        gap-4

        rounded-2xl

        px-4
        py-4

        transition-all
        duration-300

        ${
          active
            ? "bg-indigo-50 text-[#343C67]"
            : "text-slate-700 hover:bg-slate-50"
        }
      `}
    >
      {/* ICON */}

      <div
        className={`
          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-xl

          transition-all

          ${
            active
              ? "bg-[#343C67] text-white"
              : "bg-slate-100 text-[#343C67] group-hover:bg-[#343C67] group-hover:text-white"
          }
        `}
      >
        <Icon size={20} />
      </div>

      {/* TITLE */}

      <div className="flex-1">
        <p className="font-semibold">{title}</p>
      </div>

      {/* ARROW */}

      <ChevronRight
        size={18}
        className="
          text-slate-400
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />
    </Link>
  );
}