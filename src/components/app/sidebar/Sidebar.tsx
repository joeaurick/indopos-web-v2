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

  const filteredNavigation = navigation
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.title
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

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

        bg-[#171717]

        border-r
        border-white/5

        transition-all
        duration-300

        ${
          collapsed
            ? "w-[84px]"
            : "w-[290px]"
        }
      `}
    >
      {/* HEADER */}

      <div
        className="
          border-b
          border-white/5

          px-5
          py-5
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          {!collapsed && <Logo />}

          <button
            onClick={toggle}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              text-gray-400

              transition-all

              hover:bg-[#242424]
              hover:text-white
            "
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {!collapsed && (
          <div
            className="
              mt-5

              flex
              items-center
              gap-2

              rounded-xl

              bg-[#242424]

              px-4
              py-3
            "
          >
            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-green-500
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-white
              "
            >
              Online
            </span>
          </div>
        )}
      </div>

      {/* SEARCH */}

      {!collapsed && (
        <div className="pt-4">
          <SidebarSearch collapsed={collapsed} />
        </div>
      )}

      {/* MENU */}

      <nav
        className="
          flex-1
          overflow-y-auto

          px-4
          py-5

          space-y-7
        "
      >
        {filteredNavigation.map((group) => (
          <SidebarGroup
            key={group.title}
            title={group.title}
            items={group.items}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* FOOTER */}

      <div
        className="
          border-t
          border-white/5

          p-4
        "
      >
        <div
          className={`
            rounded-2xl

            bg-[#242424]

            p-3

            ${
              collapsed
                ? "flex justify-center"
                : "flex items-center gap-3"
            }
          `}
        >
          <div
  className="
    flex
    h-12
    w-12
    shrink-0
    items-center
    justify-center

    rounded-2xl

    bg-[#343C67]

    shadow-sm
  "
>
            <img
              src="/favicon.png"
              alt="IndoPOS"
              className="h-6 w-6 object-contain"
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold text-white">
                IndoPOS
              </h4>

              <p className="truncate text-xs text-gray-400">
                Business Platform
              </p>

              <div
                className="
                  mt-2

                  inline-flex

                  rounded-full

                  bg-green-500/15

                  px-2.5
                  py-1

                  text-[10px]
                  font-semibold

                  text-green-400
                "
              >
                ONLINE
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}