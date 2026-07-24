"use client";

import { Plus, Search } from "lucide-react";

import {
  AppButton,
  AppInput,
  AppPageHeader,
  AppToolbar,
} from "@/components/ui";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
};

export function CustomerToolbar({
  search,
  onSearch,
  onAdd,
}: Props) {
  return (
    <div className="space-y-6">

      <AppPageHeader
        title="Customers"
        subtitle="Kelola seluruh customer toko."
      />

      <AppToolbar
        left={
          <div className="relative w-full lg:max-w-sm">

            <AppInput
              value={search}
              onChange={(e) =>
                onSearch(e.target.value)
              }
              placeholder="Cari customer..."
              className="pl-11"
            />

          </div>
        }
        right={
          <AppButton
            onClick={onAdd}
            className="w-full lg:w-auto"
          >
            <Plus size={18} />
            Tambah Customer
          </AppButton>
        }
      />

    </div>
  );
}