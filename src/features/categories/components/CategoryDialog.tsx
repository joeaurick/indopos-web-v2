"use client";

import { ReactNode } from "react";

type Props = {
  open: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;
};

export function CategoryDialog({
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
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
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
            px-6
            py-4
          "
        >
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              px-2
              py-1
              text-slate-500
              hover:bg-slate-100
            "
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}