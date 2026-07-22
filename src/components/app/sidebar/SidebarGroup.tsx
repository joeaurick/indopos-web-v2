"use client";

import {
  ChevronDown,
  ChevronRight,
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
            px-3
            py-2
            rounded-lg
            transition
            hover:bg-slate-100
          "
        >
          <span
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-slate-400
            "
          >
            {title}
          </span>

          {opened ? (
            <ChevronDown
              size={15}
              className="text-slate-400"
            />
          ) : (
            <ChevronRight
              size={15}
              className="text-slate-400"
            />
          )}
        </button>
      )}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300

          ${
            collapsed || opened
              ? "max-h-[1200px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="space-y-2">
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