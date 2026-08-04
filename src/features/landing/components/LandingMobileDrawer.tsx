"use client";

import { DrawerAccordion } from "./drawer/DrawerAccordion";
import { DrawerFooter } from "./drawer/DrawerFooter";
import { DrawerHeader } from "./drawer/DrawerHeader";
import { DrawerItem } from "./drawer/DrawerItem";
import { drawerMenus } from "./drawer/drawer.data";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function LandingMobileDrawer({
  open,
  onClose,
}: Props) {
  return (
    <>
      {/* BACKDROP */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40

          bg-black/40
          backdrop-blur-md

          transition-all
          duration-300

          ${
            open
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* DRAWER */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50

          flex
          h-screen
          w-[340px]
          max-w-[88vw]
          flex-col

          bg-white

          shadow-[0_20px_60px_rgba(0,0,0,.18)]

          transition-transform
          duration-300
          ease-out

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* HEADER */}

        <DrawerHeader onClose={onClose} />

        {/* MENU */}

        <div
          className="
            flex-1
            overflow-y-auto

            px-5
            py-5

            space-y-2
          "
        >
          {drawerMenus.map((item) => {
            if (item.children) {
              return (
                <DrawerAccordion
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  children={item.children}
                  onNavigate={onClose}
                />
              );
            }

            return (
              <DrawerItem
                key={item.title}
                title={item.title}
                href={item.href ?? "#"}
                icon={item.icon}
                onClick={onClose}
              />
            );
          })}
        </div>

        {/* FOOTER */}

        <DrawerFooter onClose={onClose} />
      </aside>
    </>
  );
}