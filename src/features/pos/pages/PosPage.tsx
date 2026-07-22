"use client";

import { useState } from "react";

import { CartPanel } from "../components/CartPanel";
import { CategoryTabs } from "../components/CategoryTabs";
import { ProductGrid } from "../components/ProductGrid";
import { SearchBar } from "../components/SearchBar";
import { FloatingCart } from "../components/FloatingCart";
import { MobileCartSheet } from "../components/MobileCartSheet";

type Props = {
  businessId: string;
};

export function PosPage({
  businessId,
}: Props) {
  const [cartOpen, setCartOpen] =
    useState(false);

  return (
    <>
      {/* =======================
          DESKTOP
      ======================== */}

      <div className="hidden h-[calc(100vh-120px)] gap-6 lg:flex">

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
            <SearchBar
              businessId={businessId}
            />

            <div className="mt-5">
              <CategoryTabs
                businessId={businessId}
              />
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
            <ProductGrid
              businessId={businessId}
            />
          </div>
        </section>

        {/* CART */}

        <aside
          className="
            w-[420px]
            shrink-0
          "
        >
          <CartPanel
            businessId={businessId}
          />
        </aside>
      </div>

      {/* =======================
          MOBILE
      ======================== */}

      <div className="flex flex-col gap-4 lg:hidden">

        <SearchBar
          businessId={businessId}
        />

        <CategoryTabs
          businessId={businessId}
        />

        <ProductGrid
          businessId={businessId}
        />
      </div>

      <FloatingCart
        onOpen={() =>
          setCartOpen(true)
        }
      />

      <MobileCartSheet
        businessId={businessId}
        open={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />
    </>
  );
}