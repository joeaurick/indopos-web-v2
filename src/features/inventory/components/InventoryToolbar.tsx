"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;
  onSearch: (value: string) => void;
};

export function InventoryToolbar({
  search,
  onSearch,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <p className="mt-1 text-slate-500">
          Kelola stok seluruh produk.
        </p>
      </div>

      <div className="relative">
    

        <input
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder="Cari produk atau SKU..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            py-3
            pl-11
            pr-4
            outline-none
            focus:border-teal-500
          "
        />
      </div>
    </div>
  );
}