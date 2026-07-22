import { create } from "zustand";

import { dashboardService } from "../services/dashboard.service";
import { DashboardData } from "../types";

type DashboardState = {
  loading: boolean;

  data: DashboardData;

  fetchDashboard: (businessId: string) => Promise<void>;
};

const initialData: DashboardData = {
  summary: {
  todaySales: 0,
  todayCashIn: 0,
  todayIncome: 0,
  todayExpense: 0,
  todayProfit: 0,
  todayTransactions: 0,
  totalProducts: 0,
  lowStock: 0,
  totalCustomers: 0,
  totalSuppliers: 0,
  cashBalance: 0,
},

  recentSales: [],

  recentTransactions: [],

  topProducts: [],

  dailySales: [],

  activities: [],

  lowStockProducts: [],

  cashFlow: {
  cashIn: 0,
  cashOut: 0,
  balance: 0,
},

paymentMethods: [],
  
};

export const useDashboardStore =
  create<DashboardState>((set) => ({
    loading: false,

    data: initialData,

    fetchDashboard: async (businessId: string) => {
      set({
        loading: true,
      });

      try {
        const data =
  await dashboardService.getDashboard(businessId);

        set({
  data: {
    ...data,
  },

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