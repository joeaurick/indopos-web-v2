"use client";

import {
  ShoppingCart,
  ChevronUp,
} from "lucide-react";

import { useCartStore } from "../store/cart-store";

type Props = {
  onOpen: () => void;
};

export function FloatingCart({
  onOpen,
}: Props) {
  const items = useCartStore(
    (state) => state.items
  );

  const subtotal = useCartStore(
    (state) => state.subtotal()
  );

  const totalQty = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  if (!items.length) return null;

  return (
    <button
      onClick={onOpen}
      className="
        fixed
        bottom-24
        left-4
        right-4
        z-40

        lg:hidden

        rounded-2xl

        bg-[var(--primary)]
        text-white

        shadow-2xl

        transition
        hover:scale-[1.01]
      "
    >
      <div className="flex items-center justify-between px-5 py-4">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-white/20
            "
          >
            <ShoppingCart size={22} />
          </div>

          <div className="text-left">

            <h3 className="font-bold">
              {totalQty} Item
            </h3>

            <p className="text-sm text-white/80">
              Rp {subtotal.toLocaleString("id-ID")}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <span className="font-semibold">
            Lihat Keranjang
          </span>

          <ChevronUp size={20} />

        </div>

      </div>

    </button>
  );
}