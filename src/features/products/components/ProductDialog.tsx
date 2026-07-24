"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type ProductDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function ProductDialog({
  open,
  title,
  onClose,
  children,
}: ProductDialogProps) {
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

        bg-black/40

        overflow-y-auto

        p-4
      "
    >
      <div
        className="
          flex
          min-h-full
          items-center
          justify-center
        "
      >
        <div
          className="
            w-full
            max-w-2xl

            rounded-2xl
            bg-white
            shadow-2xl

            overflow-hidden
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              border-b

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

          <div className="p-6">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}