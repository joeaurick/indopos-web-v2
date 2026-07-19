"use client";

import { X } from "lucide-react";

import { CartPanel } from "./CartPanel";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileCartSheet({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}

      <div
        onClick={onClose}
        className="
          fixed
          inset-0
          z-50
          bg-black/40
          backdrop-blur-sm
          lg:hidden
        "
      />

      {/* SHEET */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-[60]

          h-[85vh]

          overflow-hidden

          rounded-t-[34px]

          bg-white

          shadow-2xl

          animate-in
          slide-in-from-bottom
          duration-300

          lg:hidden
        "
      >
        {/* HANDLE */}

        <div className="flex justify-center py-3">

          <div
            className="
              h-1.5
              w-14
              rounded-full
              bg-slate-300
            "
          />

        </div>

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b

            px-5
            pb-4
          "
        >
          <div>

            <h2 className="text-xl font-bold">
              Keranjang
            </h2>

            <p className="text-sm text-slate-500">
              Daftar belanja pelanggan
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* CART */}

        <div className="h-[calc(85vh-84px)]">

          <CartPanel />

        </div>

      </div>
    </>
  );
}