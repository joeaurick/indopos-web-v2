"use client";

import { Search, X } from "lucide-react";

import { useProductStore } from "@/features/products";

type Props = {
  businessId: string;
};

export function SearchBar({
  businessId,
}: Props) {
  void businessId;

  const search = useProductStore((state) => state.search ?? "");
  const setSearch = useProductStore((state) => state.setSearch);

  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder=""
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          pl-14
          pr-28
          text-[15px]
          font-medium
          outline-none
          transition-all
          duration-200
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--primary)]
          focus:ring-4
          focus:ring-blue-100
        "
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="
            absolute
            right-16
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-lg
            text-[var(--text-muted)]
            transition
            hover:bg-[var(--hover)]
          "
        >
          <X size={16} />
        </button>
      )}

      <div
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          rounded-lg
          border
          border-[var(--border)]
          bg-[var(--hover)]
          px-2.5
          py-1
          text-xs
          font-semibold
          text-[var(--text-muted)]
          select-none
        "
      >
        Ctrl K
      </div>
    </div>
  );
}