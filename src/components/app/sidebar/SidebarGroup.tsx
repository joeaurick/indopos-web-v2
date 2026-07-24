"use client";

import {
  ChevronDown,
} from "lucide-react";

import { useSidebarGroupStore } from "@/store/sidebar-group.store";

import { SidebarItem } from "./SidebarItem";

type Item = {
  title: string;
  href: string;
  icon: any;
};

type Props = {
  title: string;
  items: Item[];
  collapsed: boolean;
};

export function SidebarGroup({
  title,
  items,
  collapsed,
}: Props) {
  const opened = useSidebarGroupStore(
    (state) => state.opened[title]
  );

  const toggle = useSidebarGroupStore(
    (state) => state.toggle
  );

  return (
    <div className="space-y-2">

      {!collapsed && (

        <button
          type="button"
          onClick={() => toggle(title)}
          className="
            flex
            w-full
            items-center
            justify-between

            rounded-lg

            px-2
            py-1.5

            transition-colors

            hover:bg-slate-50
          "
        >
          <span
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            {title}
          </span>

          <ChevronDown
            size={15}
            className={`
              text-slate-400
              transition-transform
              duration-200

              ${
                opened
                  ? "rotate-180"
                  : ""
              }
            `}
          />

        </button>

      )}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-200

          ${
            collapsed || opened
              ? "max-h-[1200px]"
              : "max-h-0"
          }
        `}
      >

        <div className="space-y-1">

          {items.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              collapsed={collapsed}
            />
          ))}

        </div>

      </div>

    </div>
  );
}