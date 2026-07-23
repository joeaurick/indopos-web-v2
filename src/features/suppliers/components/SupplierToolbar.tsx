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

export function SupplierToolbar({
  search,
  onSearch,
  onAdd,
}: Props) {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Suppliers
          </h1>

          <p className="mt-1 text-slate-500">
            Kelola semua supplier.
          </p>

        </div>

        <button
          onClick={onAdd}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-teal-600
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-teal-700
          "
        >
          <Plus size={18} />
          Tambah Supplier
        </button>

      </div>

      <div className="relative">

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