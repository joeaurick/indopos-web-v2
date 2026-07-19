"use client";

import { CartPanel } from "../components/CartPanel";
import { CategoryTabs } from "../components/CategoryTabs";
import { ProductGrid } from "../components/ProductGrid";
import { SearchBar } from "../components/SearchBar";

import { useState } from "react";

import { FloatingCart } from "../components/FloatingCart";
import { MobileCartSheet } from "../components/MobileCartSheet";

export function PosPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* =======================
          DESKTOP
      ======================== */}

      <div className="hidden lg:flex h-[calc(100vh-120px)] gap-6">

        {/* PRODUCT */}

        <section
          className="
            flex
            min-w-0
            flex-1
            flex-col
            overflow-hidden
            rounded-[32px]
            border
            border-[var(--border)]
            bg-[var(--card)]
            shadow-sm
          "
        >

          <div
            className="
              shrink-0
              border-b
              border-[var(--border)]
              p-6
            "
          >
            <SearchBar />

            <div className="mt-5">
              <CategoryTabs />
            </div>

          </div>

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              p-6
            "
          >
            <ProductGrid />
          </div>

        </section>

        {/* CART */}

        <aside
          className="
            w-[420px]
            shrink-0
          "
        >
          <CartPanel />
        </aside>

      </div>

      {/* =======================
          MOBILE
      ======================== */}

      <div className="flex flex-col gap-4 lg:hidden">

        {/* SEARCH */}

        <SearchBar />

        {/* CATEGORY */}

        <CategoryTabs />

        {/* PRODUCT */}

        <ProductGrid />

      </div>

      <FloatingCart
  onOpen={() => setCartOpen(true)}
/>

<MobileCartSheet
  open={cartOpen}
  onClose={() => setCartOpen(false)}
/>
    </>
  );
}