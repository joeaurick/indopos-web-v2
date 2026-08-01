"use client";

import { ReactNode } from "react";

import { Sidebar } from "@/components/app/sidebar/Sidebar";
import { Topbar } from "@/components/app/topbar/Topbar";
import { TopbarMobile } from "@/components/app/topbar/TopbarMobile";

type Props = {
  children: ReactNode;
};

export function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">

      {/* Sidebar Desktop */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Desktop */}

        <Topbar />

        {/* Mobile */}

        <TopbarMobile />

        <main
          className="
            min-w-0
            flex-1
            overflow-x-hidden

            px-4
            py-4

            sm:px-5

            lg:p-8
          "
        >
          <div className="mx-auto w-full max-w-[1700px]">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}