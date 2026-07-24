"use client";

import { ReactNode } from "react";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
};

export function TableToolbar({
  left,
  right,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-b
        border-[var(--border)]
        p-5

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="flex flex-wrap items-center gap-3">
        {left}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {right}
      </div>
    </div>
  );
}