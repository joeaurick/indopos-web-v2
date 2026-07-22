import { create } from "zustand";

import { cashOutService } from "../services/cash-out.service";

import {
  CashOutData,
  CashOutFilter,
  Expense,
} from "../types";

type CashOutState = {
  loading: boolean;

  filter: CashOutFilter;

  data: CashOutData;

  setFilter: (
    filter: Partial<CashOutFilter>
  ) => void;

  fetchCashOut: (
    businessId: string
  ) => Promise<void>;

  uploadReceipt: (
    file: File
  ) => Promise<string>;

  deleteReceipt: (
    url: string
  ) => Promise<void>;

  createExpense: (
    businessId: string,
    data: {
      category_id: string | null;
      title: string;
      description?: string;
      amount: number;
      payment_method: string;
      expense_date: string;
      receipt_number?: string;
      attachment_url?: string | null;
    }
  ) => Promise<void>;

  updateExpense: (
    businessId: string,
    id: string,
    data: Partial<Expense>
  ) => Promise<void>;

  deleteExpense: (
    businessId: string,
    id: string
  ) => Promise<void>;
};

const initialData: CashOutData = {
  summary: {
    totalExpense: 0,
    totalTransaction: 0,
    todayExpense: 0,
    monthExpense: 0,
  },

  categories: [],

  expenses: [],
};

export const useCashOutStore =
  create<CashOutState>((set, get) => ({
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

    fetchCashOut: async (
      businessId
    ) => {
      set({
        loading: true,
      });

      try {
        const data =
          await cashOutService.getCashOut(
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

    uploadReceipt: async (
      file
    ) => {
      return await cashOutService.uploadReceipt(
        file
      );
    },

    deleteReceipt: async (
      url
    ) => {
      await cashOutService.deleteReceipt(
        url
      );
    },

    createExpense: async (
      businessId,
      payload
    ) => {
      set({
        loading: true,
      });

      try {
        await cashOutService.createExpense(
          businessId,
          payload
        );

        await get().fetchCashOut(
          businessId
        );
      } catch (error) {
        throw error;
      } finally {
        set({
          loading: false,
        });
      }
    },

    updateExpense: async (
      businessId,
      id,
      payload
    ) => {
      set({
        loading: true,
      });

      try {
        await cashOutService.updateExpense(
          businessId,
          id,
          payload
        );

        await get().fetchCashOut(
          businessId
        );
      } catch (error) {
        throw error;
      } finally {
        set({
          loading: false,
        });
      }
    },

    deleteExpense: async (
      businessId,
      id
    ) => {
      set({
        loading: true,
      });

      try {
        await cashOutService.deleteExpense(
          businessId,
          id
        );

        await get().fetchCashOut(
          businessId
        );
      } catch (error) {
        throw error;
      } finally {
        set({
          loading: false,
        });
      }
    },
  }));