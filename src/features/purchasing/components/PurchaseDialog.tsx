"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function PurchaseDialog({
  open,
  title,
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        overflow-y-auto

        bg-black/40
        backdrop-blur-sm

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
            flex
            w-full
            max-w-3xl
            max-h-[90vh]
            flex-col

            overflow-hidden

            rounded-2xl
            bg-white
            shadow-2xl
          "
        >
          {/* Header */}

          <div
            className="
              sticky
              top-0
              z-10

              flex
              items-center
              justify-between

              border-b

              bg-white

              p-6
            "
          >
            <h2 className="text-2xl font-bold">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                p-2
                transition
                hover:bg-slate-100
              "
            >
              <X />
            </button>
          </div>

          {/* Body */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-6
            "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}