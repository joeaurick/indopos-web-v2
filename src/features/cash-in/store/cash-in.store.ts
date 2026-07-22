import { create } from "zustand";

import { cashInService } from "../services/cash-in.service";

import {
  CashIn,
  CashInData,
  CashInFilter,
} from "../types";

type CashInState = {
  loading: boolean;

  filter: CashInFilter;

  data: CashInData;

  setFilter: (
    filter: Partial<CashInFilter>
  ) => void;

  fetchCashIn: (
    businessId: string
  ) => Promise<void>;

  createCashIn: (
    businessId: string,
    data: {
      category_id: string | null;
      title: string;
      description?: string;
      amount: number;
      payment_method: string;
      cash_in_date: string;
      receipt_number?: string;
      attachment_url?: string;
    }
  ) => Promise<void>;

  updateCashIn: (
    businessId: string,
    id: string,
    data: Partial<CashIn>
  ) => Promise<void>;

  deleteCashIn: (
    businessId: string,
    id: string
  ) => Promise<void>;
};

const initialData: CashInData = {
  summary: {
    totalIncome: 0,
    totalTransaction: 0,
    todayIncome: 0,
    monthIncome: 0,
  },

  categories: [],

  cashIn: [],
};

export const useCashInStore =
  create<CashInState>((set, get) => ({
    loading: false,

    filter: {
      search: "",
      categoryId: "",
      startDate: "",
      endDate: "",
    },

    data: initialData,

    setFilter: (filter) =>
      set({
        filter: {
          ...get().filter,
          ...filter,
        },
      }),

    fetchCashIn: async (
      businessId
    ) => {
      set({
        loading: true,
      });

      try {
        const data =
          await cashInService.getCashIn(
            businessId,
            get().filter
          );

        set({
          data,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    createCashIn: async (
      businessId,
      payload
    ) => {
      set({
        loading: true,
      });

      try {
        await cashInService.createCashIn(
          businessId,
          payload
        );

        const data =
          await cashInService.getCashIn(
            businessId,
            get().filter
          );

        set({
          data,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    updateCashIn: async (
      businessId,
      id,
      payload
    ) => {
      set({
        loading: true,
      });

      try {
        await cashInService.updateCashIn(
          businessId,
          id,
          payload
        );

        const data =
          await cashInService.getCashIn(
            businessId,
            get().filter
          );

        set({
          data,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    deleteCashIn: async (
      businessId,
      id
    ) => {
      set({
        loading: true,
      });

      try {
        await cashInService.deleteCashIn(
          businessId,
          id
        );

        const data =
          await cashInService.getCashIn(
            businessId,
            get().filter
          );

        set({
          data,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },
  }));