"use client";

import {
  useEffect,
  useMemo,
} from "react";

import { useInventoryStore } from "../store/inventory.store";

import { InventoryToolbar } from "../components/InventoryToolbar";
import { InventoryTable } from "../components/InventoryTable";

type Props = {
  businessId: string;
};

export function InventoryPage({
  businessId,
}: Props) {
  const loading =
    useInventoryStore(
      (state) => state.loading
    );

  const items =
    useInventoryStore(
      (state) => state.items
    );

  const search =
    useInventoryStore(
      (state) => state.search
    );

  const selectedCategory =
    useInventoryStore(
      (state) =>
        state.selectedCategory
    );

  const setSearch =
    useInventoryStore(
      (state) => state.setSearch
    );

  const fetchInventory =
    useInventoryStore(
      (state) =>
        state.fetchInventory
    );

  useEffect(() => {
    fetchInventory(
      businessId
    );
  }, [
    businessId,
    fetchInventory,
  ]);

  const filteredItems =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      return items.filter(
        (item) => {
          const matchSearch =
            keyword === "" ||
            item.product_name
              .toLowerCase()
              .includes(
                keyword
              ) ||
            item.sku
              .toLowerCase()
              .includes(
                keyword
              );

          const matchCategory =
            !selectedCategory ||
            item.category_id ===
              selectedCategory;

          return (
            matchSearch &&
            matchCategory
          );
        }
      );
    }, [
      items,
      search,
      selectedCategory,
    ]);

  return (
    <div className="space-y-6">
      <InventoryToolbar
        search={search}
        onSearch={
          setSearch
        }
      />

      <InventoryTable
        items={
          filteredItems
        }
        loading={
          loading
        }
      />
    </div>
  );
}