"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TableSearch({
  value,
  onChange,
  placeholder = "Cari data...",
}: Props) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-[var(--border)]
          bg-white
          pl-11
          pr-4
          text-sm
          outline-none
          transition
          focus:border-[var(--primary)]
          focus:ring-2
          focus:ring-[var(--primary)]/10
        "
      />
    </div>
  );
}