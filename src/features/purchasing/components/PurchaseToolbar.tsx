"use client";

import { Plus, Search } from "lucide-react";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
};

export function PurchaseToolbar({
  search,
  onSearch,
  onAdd,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="relative flex-1">

      

        <input
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder="Cari di sini..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-teal-500"
        />

      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
      >
        <Plus size={18} />
        Purchase
      </button>

    </div>
  );
}