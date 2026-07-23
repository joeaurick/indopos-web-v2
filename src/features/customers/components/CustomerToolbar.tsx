"use client";

import {
  Plus,
  Search,
} from "lucide-react";

type Props = {
  search: string;
  onSearch: (
    value: string
  ) => void;

  onAdd: () => void;
};

export function CustomerToolbar({
  search,
  onSearch,
  onAdd,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder=""
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-teal-500"
        />

      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
      >
        <Plus size={18} />

        Tambah Customer
      </button>

    </div>
  );
}