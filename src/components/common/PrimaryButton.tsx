"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}