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
        border-slate-200/70
        bg-gradient-to-b
        from-[#F8FAFC]
        via-white
        to-[#F3F7FB]
        backdrop-blur-xl
        shadow-[8px_0_40px_rgba(15,23,42,0.05)]
        transition-all
        duration-300

        ${
          collapsed
            ? "w-[84px]"
            : "w-[300px]"
        }
      `}
    >
      {/* HEADER */}

      <div
        className="
          flex
          h-20
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200/70
          bg-white/70
          px-5
          backdrop-blur-xl
        "
      >
        {!collapsed && <Logo />}

        <button
          onClick={toggle}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-[var(--primary)]
            hover:text-[var(--primary)]
            hover:shadow-md
          "
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* SEARCH */}

      <div
        className="
          border-b
          border-slate-200/70
          bg-white/70
          px-3
          py-3
          backdrop-blur-xl
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
          space-y-8
          overflow-y-auto
          px-4
          py-6
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
          border-slate-200/70
          bg-white/70
          p-5
          backdrop-blur-xl
        "
      >
        <div
          className={`
            flex
            items-center

            ${
              collapsed
                ? "justify-center"
                : "gap-4"
            }
          `}
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              bg-gradient-to-br
              from-teal-500
              to-cyan-600
              shadow-lg
            "
          >
            <img
              src="/favicon.png"
              alt="IndoPOS"
              className="h-9 w-9"
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">

              <h4
                className="
                  truncate
                  text-[15px]
                  font-bold
                  tracking-tight
                  text-slate-800
                "
              >
                IndoPOS
              </h4>

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  text-slate-500
                "
              >
                Business Management Platform
              </p>

              <p
                className="
                  mt-2
                  inline-flex
                  rounded-full
                  bg-emerald-100
                  px-2
                  py-1
                  text-[11px]
                  font-medium
                  text-emerald-700
                "
              >
                Version 2.0.0
              </p>

            </div>
          )}
        </div>
      </div>
    </aside>
  );
}