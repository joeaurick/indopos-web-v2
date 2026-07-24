"use client";

import {
  Plus,
  Search,
  Package,
} from "lucide-react";

import {
  AppButton,
  AppInput,
  AppPageHeader,
} from "@/components/ui";

import { CategoryFilter } from "./CategoryFilter";

type Props = {
  businessId: string;

  search: string;
  onSearch: (value: string) => void;

  selectedCategory: string | null;
  onSelectCategory: (
    id: string | null
  ) => void;

  onAdd: () => void;
};

export function ProductToolbar({
  businessId,
  search,
  onSearch,
  selectedCategory,
  onSelectCategory,
  onAdd,
}: Props) {
  return (
    <div className="space-y-6">

      <AppPageHeader
        title="Products"
        subtitle="Kelola seluruh produk toko Anda."
      />

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              flex-1
              flex-col
              gap-4

              lg:flex-row
              lg:items-center
            "
          >

            {/* Search */}

            <div className="relative flex-1">

              <AppInput
                value={search}
                onChange={(e) =>
                  onSearch(e.target.value)
                }
                placeholder="Cari nama produk atau SKU..."
                className="
                  h-12
                  rounded-xl
                  border-slate-200
                  pl-11
                  shadow-none
                "
              />

            </div>

            {/* Filter */}

            <div className="w-full lg:w-72">

              <CategoryFilter
                businessId={businessId}
                value={selectedCategory}
                onChange={onSelectCategory}
              />

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div
              className="
                hidden
                items-center
                gap-2

                rounded-xl
                bg-slate-100

                px-4
                py-3

                lg:flex
              "
            >
              <Package
                size={18}
                className="text-emerald-600"
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-600
                "
              >
                Data Produk
              </span>

            </div>

            <AppButton
              onClick={onAdd}
              className="
                h-12
                w-full

                rounded-xl

                px-6

                lg:w-auto
              "
            >
              <Plus size={18} />

              Tambah Produk

            </AppButton>

          </div>

        </div>

      </div>

    </div>
  );
}