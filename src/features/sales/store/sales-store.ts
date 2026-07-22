import { create } from "zustand";

import { salesService } from "../services/sales.service";

export type Sale = {
  id: string;

  invoice: string;

  customer_id: string | null;

  subtotal: number;

  discount: number;

  tax: number;

  total: number;

  payment_method: string;

  payment_amount: number;

  change_amount: number;

  status: string;

  note: string | null;

  is_active: boolean;

  created_at: string;
};

type SalesState = {
  sales: Sale[];

  loading: boolean;

  search: string;

  fetchSales: (
    businessId: string
  ) => Promise<void>;

  setSearch: (
    value: string
  ) => void;

  refresh: (
    businessId: string
  ) => Promise<void>;
};

export const useSalesStore =
  create<SalesState>((set, get) => ({
    sales: [],

    loading: false,

    search: "",

    setSearch: (value) => {
      set({
        search: value,
      });
    },

    fetchSales: async (
      businessId
    ) => {
      set({
        loading: true,
      });

      try {
        const sales =
          await salesService.getSales(
            businessId
          );

        set({
          sales,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    refresh: async (
      businessId
    ) => {
      await get().fetchSales(
        businessId
      );
    },
  }));