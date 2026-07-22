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
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/70
        bg-white/80
        shadow-sm
        backdrop-blur-xl
      "
    >
      {!collapsed && (
        <button
          type="button"
          onClick={() => toggle(title)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-3xl
            px-5
            py-4
            transition-all
            duration-200
            hover:bg-slate-50
          "
        >
          <span
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-slate-500
            "
          >
            {title}
          </span>

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-slate-100
            "
          >
            {opened ? (
              <ChevronDown
                size={16}
                className="text-slate-500"
              />
            ) : (
              <ChevronRight
                size={16}
                className="text-slate-500"
              />
            )}
          </div>
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
        <div
          className="
            space-y-2
            px-3
            pb-3
          "
        >
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}