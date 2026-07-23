"use client";

import { Plus } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { SearchToolbar } from "@/components/common/SearchToolbar";
import { PrimaryButton } from "@/components/common/PrimaryButton";

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
    <div className="space-y-5">
      <PageHeader
        title="Products"
        description="Kelola semua produk toko."
      />

      <div
        className="
          flex
          flex-col
          gap-3
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div className="flex-1">
          <SearchToolbar
            value={search}
            onChange={onSearch}
            placeholder=""
          />
        </div>

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          <CategoryFilter
            businessId={businessId}
            value={selectedCategory}
            onChange={onSelectCategory}
          />

          <PrimaryButton
            onClick={onAdd}
            className="
              w-full
              sm:w-auto
              whitespace-nowrap
            "
          >
            <span className="flex items-center gap-2 justify-center">
              <Plus size={18} />
              Tambah Produk
            </span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}