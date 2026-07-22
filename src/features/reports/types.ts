export type ReportFilterType =
  | "all"
  | "today"
  | "week"
  | "month"
  | "custom";

export type ReportFilter = {
  type: ReportFilterType;

  startDate?: string;

  endDate?: string;
};

export type ReportSummary = {
  totalSales: number;

  totalCashIn: number;

  totalIncome: number;

  totalPurchases: number;

  totalExpenses: number;

  totalExpense: number;

  grossProfit: number;

  netProfit: number;

  totalTransactions: number;
};

export type ReportHistoryItem = {
  id: string;

  type:
    | "SALE"
    | "PURCHASE"
    | "CASH_IN"
    | "EXPENSE";

  invoice: string;

  total: number;

  status: string;

  created_at: string;
};

export type ReportProductItem = {
  id: string;

  name: string;

  qty: number;

  omzet: number;

  profit: number;

  percentage: number;
};

export type ReportBusiness = {
  id: string;

  name: string;

  address: string;

  phone: string;

  email: string;

  logo_url: string | null;

  receipt_footer: string;
};

export type ReportData = {
  business: ReportBusiness;

  summary: ReportSummary;

  history: ReportHistoryItem[];

  products: ReportProductItem[];
};