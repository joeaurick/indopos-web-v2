import { create } from "zustand";

import { financeService } from "../services/finance.service";

import {
  FinanceData,
  FinanceFilter,
} from "../types";

type FinanceState = {
  loading: boolean;

  filter: FinanceFilter;

  data: FinanceData;

  fetchFinance: (
    businessId: string,
    filter?: FinanceFilter
  ) => Promise<void>;
};

const initialData: FinanceData = {
  summary: {
    totalSales: 0,

    totalCashIn: 0,

    totalIncome: 0,

    totalPurchases: 0,

    totalExpenses: 0,

    totalExpense: 0,

    grossProfit: 0,

    netProfit: 0,

    totalTransactions: 0,

    totalPurchaseOrders: 0,

    totalCashOut: 0,

    totalCashInTransactions: 0,
  },

  history: [],

  chart: [],
};

export const useFinanceStore =
  create<FinanceState>((set) => ({
    loading: false,

    filter: {
      type: "all",
    },

    data: initialData,

    fetchFinance: async (
      businessId,
      filter = {
        type: "all",
      }
    ) => {
      set({
        loading: true,
        filter,
      });

      try {
        const data =
          await financeService.getFinance(
            businessId,
            filter
          );

        set({
          data,
          loading: false,
        });
      } catch (error) {
        console.error(error);

        set({
          loading: false,
        });
      }
    },
  }));