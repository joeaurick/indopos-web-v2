"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type SupplierDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function SupplierDialog({
  open,
  title,
  onClose,
  children,
}: SupplierDialogProps) {
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/40

        p-4
      "
    >
      <div
        className="
          flex
          w-full
          max-w-2xl
          max-h-[90vh]
          flex-col

          overflow-hidden

          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between

            border-b

            bg-white

            px-6
            py-5
          "
        >
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto

            p-6

            pb-32
            md:pb-6
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}