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
        items-end

        bg-black/40
        backdrop-blur-sm

        p-3

        md:items-center
        md:p-6
      "
    >
      <div
        className="
          w-full

          max-h-[92vh]
          overflow-y-auto

          rounded-t-3xl
          md:rounded-3xl

          border
          border-[var(--border)]

          bg-[var(--card)]

          shadow-2xl

          md:max-w-2xl
          md:mx-auto
        "
      >
        <div
          className="
            sticky
            top-0

            flex
            items-center
            justify-between

            border-b
            border-[var(--border)]

            bg-[var(--card)]

            p-5
          "
        >
          <h2 className="text-lg md:text-xl font-bold">
            {title}
          </h2>

          <button
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

        <div className="p-5 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}