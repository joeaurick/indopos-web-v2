"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function AppModal({
  open,
  title,
  children,
  onClose,
}: Props) {
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
        backdrop-blur-sm

        p-4
      "
    >
      <div
        className="
          w-full
          max-w-xl

          max-h-[90vh]
          overflow-y-auto

          rounded-3xl

          border
          border-[var(--border)]

          bg-[var(--card)]

          shadow-2xl

          animate-in
          fade-in
          zoom-in-95
        "
      >
        <div
          className="
            sticky
            top-0

            flex
            items-center
            justify-between

            rounded-t-3xl

            border-b
            border-[var(--border)]

            bg-[var(--card)]

            px-6
            py-5
          "
        >
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-[var(--hover)]
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}