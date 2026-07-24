"use client";

import {
  ReactNode,
  useEffect,
} from "react";

import { X } from "lucide-react";

type Props = {
  open: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;

  width?: "sm" | "md" | "lg" | "xl";
};

const widthClass = {
  sm: "max-w-md",

  md: "max-w-xl",

  lg: "max-w-3xl",

  xl: "max-w-5xl",
};

export function Modal({
  open,
  title,
  children,
  onClose,
  width = "md",
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handler = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handler
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div
        className={`w-full ${widthClass[width]} overflow-hidden rounded-3xl bg-white shadow-2xl`}
      >

        <div className="flex items-center justify-between border-b px-6 py-5">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        <div
    className="
        max-h-[75vh]
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