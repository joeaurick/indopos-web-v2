import { create } from "zustand";

import {
  InventoryItem,
  StockAdjustmentPayload,
} from "../types";

import { inventoryService } from "../services/inventory.service";

type InventoryState = {
  items: InventoryItem[];

  loading: boolean;

  search: string;

  selectedCategory: string | null;

  fetchInventory: (
    businessId: string
  ) => Promise<void>;

  adjustStock: (
    businessId: string,
    payload: StockAdjustmentPayload
  ) => Promise<void>;

  setSearch: (
    value: string
  ) => void;

  setSelectedCategory: (
    id: string | null
  ) => void;
};

export const useInventoryStore =
  create<InventoryState>(
    (set, get) => ({
      items: [],

      loading: false,

      search: "",

      selectedCategory:
        null,

      setSearch: (
        value
      ) => {
        set({
          search: value,
        });
      },

      setSelectedCategory: (
        id
      ) => {
        set({
          selectedCategory:
            id,
        });
      },

      fetchInventory:
        async (
          businessId
        ) => {
          set({
            loading: true,
          });

          try {
            const items =
              await inventoryService.getInventory(
                businessId
              );

            set({
              items,
            });
          } catch (
            error
          ) {
            console.error(
              error
            );
          } finally {
            set({
              loading: false,
            });
          }
        },

      adjustStock:
        async (
          businessId,
          payload
        ) => {
          set({
            loading: true,
          });

          try {
            await inventoryService.adjustStock(
              businessId,
              payload
            );

            await get().fetchInventory(
              businessId
            );
          } finally {
            set({
              loading: false,
            });
          }
        },
    })
  );