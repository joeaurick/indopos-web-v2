"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function TablePagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-t
        border-[var(--border)]
        p-5
      "
    >
      <button
        disabled={page <= 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-[var(--border)]
          px-4
          py-2
          text-sm
          disabled:opacity-50
        "
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <div className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </div>

      <button
        disabled={page >= totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-[var(--border)]
          px-4
          py-2
          text-sm
          disabled:opacity-50
        "
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}