"use client";

import { useEffect } from "react";

import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { navigation } from "@/constants/navigation";
import { Logo } from "@/components/app/logo/Logo";

import { useSidebarStore } from "@/store/sidebar.store";
import { useSidebarGroupStore } from "@/store/sidebar-group.store";
import { useSidebarSearchStore } from "@/store/sidebar-search.store";

import { SidebarGroup } from "./SidebarGroup";
import { SidebarSearch } from "./SidebarSearch";

export function Sidebar() {
  const collapsed = useSidebarStore(
    (state) => state.collapsed
  );

  const toggle = useSidebarStore(
    (state) => state.toggle
  );

  const hydrate = useSidebarGroupStore(
    (state) => state.hydrate
  );

  const keyword =
    useSidebarSearchStore(
      (state) => state.keyword
    );

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const filteredNavigation =
    navigation
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.title
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            )
        ),
      }))
      .filter(
        (group) =>
          group.items.length > 0
      );

  return (
    <aside
  className={`
    hidden
    lg:flex
    sticky
    top-0
    h-screen
    shrink-0
    flex-col
    border-r
    border-[var(--border)]
    bg-white
    shadow-[0_1px_3px_rgba(15,23,42,.04)]
    transition-all
    duration-300

    ${
      collapsed
        ? "w-[76px]"
        : "w-[272px]"
    }
  `}
>
      {/* HEADER */}

      <div
  className="
    flex
    h-16
    shrink-0
    items-center
    justify-between
    border-b
    border-[var(--border)]
    bg-white
    px-4
  "
>
  {!collapsed && <Logo />}

  <button
    onClick={toggle}
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-xl
      border
      border-[var(--border)]
      bg-white
      text-slate-500
      transition-all
      hover:border-[var(--primary)]
      hover:text-[var(--primary)]
      hover:bg-[var(--hover)]
    "
  >
    {collapsed ? (
      <PanelLeftOpen size={18} />
    ) : (
      <PanelLeftClose size={18} />
    )}
  </button>
</div>

      {/* SEARCH */}

      <div
  className="
    border-b
    border-[var(--border)]
    bg-white
    px-3
    py-3
  "
>
  <SidebarSearch
    collapsed={collapsed}
  />
</div>

      {/* MENU */}

      <nav
  className="
    flex-1
    overflow-y-auto
    px-3
    py-4
    space-y-6
  "
>
        {filteredNavigation.map(
          (group) => (
            <SidebarGroup
              key={group.title}
              title={group.title}
              items={group.items}
              collapsed={collapsed}
            />
          )
        )}
      </nav>

      {/* FOOTER */}

      <div
  className="
    border-t
    border-[var(--border)]
    bg-white
    p-4
  "
>
  <div
    className={`
      flex
      items-center
      ${
        collapsed
          ? "justify-center"
          : "gap-3"
      }
    `}
  >
    <div
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-[var(--primary)]
        text-white
      "
    >
      <img
        src="/favicon.png"
        alt="IndoPOS"
        className="h-6 w-6"
      />
    </div>

    {!collapsed && (
      <div className="min-w-0">
        <h4 className="truncate text-sm font-semibold">
          IndoPOS
        </h4>

        <p className="truncate text-xs text-[var(--text-muted)]">
          Business Platform
        </p>

        <span
          className="
            mt-2
            inline-flex
            rounded-full
            bg-emerald-50
            px-2
            py-1
            text-[10px]
            font-medium
            text-emerald-700
          "
        >
          v2.0.0
        </span>
      </div>
    )}
  </div>
</div>
    </aside>
  );
}