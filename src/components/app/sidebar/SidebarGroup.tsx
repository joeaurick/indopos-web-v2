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
    <div className="mb-5">

      {!collapsed && (
        <div className="mb-3">

          <button
            type="button"
            onClick={() => toggle(title)}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              px-3
              py-2
              transition-all
              duration-300
              hover:bg-slate-100
            "
          >

            <div className="flex items-center gap-3">

              <div className="h-[1px] w-6 bg-slate-200 transition-all duration-300 group-hover:w-8 group-hover:bg-teal-500" />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-slate-400
                  transition-colors
                  group-hover:text-slate-700
                "
              >
                {title}
              </span>

            </div>

            <div
              className={`
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                transition-all
                duration-300

                ${
                  opened
                    ? "bg-slate-100 rotate-180"
                    : "group-hover:bg-slate-100"
                }
              `}
            >
              <ChevronDown
                size={14}
                className="text-slate-500"
              />
            </div>

          </button>

        </div>
      )}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500
          ease-in-out

          ${
            collapsed || opened
              ? "max-h-[1500px] opacity-100"
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