"use client";

import { ReactNode } from "react";

import { Sidebar } from "@/components/app/sidebar/Sidebar";
import { Topbar } from "@/components/app/topbar/Topbar";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";

type Props = {
  children: ReactNode;
};

export function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">

      {/* Sidebar hanya desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">

        <Topbar />

        <main
  className="
    min-w-0
    flex-1
    overflow-x-hidden

    px-4
    pt-4

    pb-40 md:pb-8

    sm:px-5
    md:p-8
  "
>
          <div className="mx-auto w-full max-w-[1700px]">
            {children}
          </div>
        </main>

      </div>

      <MobileBottomNav />

    </div>
  );
}