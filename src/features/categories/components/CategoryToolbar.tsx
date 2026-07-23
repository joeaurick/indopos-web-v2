"use client";

import { Plus } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { SearchToolbar } from "@/components/common/SearchToolbar";
import { PrimaryButton } from "@/components/common/PrimaryButton";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
};

export function CategoryToolbar({
  search,
  onSearch,
  onAdd,
}: Props) {
  return (
    <div className="space-y-6">

      <PageHeader
        title="Categories"
        description="Kelola semua kategori produk."
        action={
          <PrimaryButton onClick={onAdd}>
            <span className="flex items-center gap-2">
              <Plus size={18} />
              Tambah Kategori
            </span>
          </PrimaryButton>
        }
      />

      <SearchToolbar
        value={search}
        onChange={onSearch}
        placeholder=""
      />

    </div>
  );
}