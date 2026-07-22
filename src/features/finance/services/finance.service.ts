import { getSupabaseClient } from "@/services/supabase/client";

const supabase = getSupabaseClient();

import {
  FinanceData,
  FinanceFilter,
  FinanceHistoryItem,
  FinanceChartItem,
} from "../types";

export const financeService = {
  async getFinance(
    businessId: string,
    filter?: FinanceFilter
  ): Promise<FinanceData> {

    let salesQuery = supabase
      .from("sales")
      .select(`
        id,
        invoice,
        total,
        status,
        created_at
      `)
      .eq("business_id", businessId)
      .eq("is_active", true);

    let purchaseQuery = supabase
      .from("purchase_orders")
      .select(`
        id,
        invoice_number,
        total,
        status,
        created_at
      `)
      .eq("business_id", businessId)
      .eq("is_active", true);

    let cashInQuery = supabase
      .from("cash_in")
      .select(`
        id,
        title,
        amount,
        receipt_number,
        created_at,
        cash_in_date
      `)
      .eq("business_id", businessId)
      .eq("is_active", true);

    let expenseQuery = supabase
      .from("expenses")
      .select(`
        id,
        title,
        amount,
        expense_date,
        payment_method,
        receipt_number
      `)
      .eq("business_id", businessId)
      .eq("is_active", true);

    // SELANJUTNYA BIARKAN PERSIS SEPERTI FILE KAMU

    if (filter) {
      const now = new Date();

      let start: Date | null = null;
      let end: Date |null = null;

      switch (filter.type) {
        case "today":
          start = new Date();
          start.setHours(0, 0, 0, 0);

          end = new Date();
          end.setHours(23, 59, 59, 999);
          break;

        case "week":
          start = new Date();
          start.setDate(
            start.getDate() - start.getDay()
          );
          start.setHours(0, 0, 0, 0);

          end = new Date();
          end.setHours(23, 59, 59, 999);
          break;

        case "month":
          start = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          );

          end = new Date();
          end.setHours(23, 59, 59, 999);
          break;

        case "custom":
          if (
            filter.startDate &&
            filter.endDate
          ) {
            start = new Date(
              filter.startDate
            );

            end = new Date(
              filter.endDate
            );

            end.setHours(
              23,
              59,
              59,
              999
            );
          }
          break;
      }

      if (start && end) {
        salesQuery = salesQuery
          .gte(
            "created_at",
            start.toISOString()
          )
          .lte(
            "created_at",
            end.toISOString()
          );

        purchaseQuery = purchaseQuery
          .gte(
            "created_at",
            start.toISOString()
          )
          .lte(
            "created_at",
            end.toISOString()
          );

        expenseQuery = expenseQuery
          .gte(
            "expense_date",
            start.toISOString().slice(0, 10)
          )
          .lte(
            "expense_date",
            end.toISOString().slice(0, 10)
          );
          cashInQuery = cashInQuery
  .gte(
    "cash_in_date",
    start.toISOString().slice(0, 10)
  )
  .lte(
    "cash_in_date",
    end.toISOString().slice(0, 10)
  );
      }
    }

    const {
      data: sales,
      error: salesError,
    } = await salesQuery.order(
      "created_at",
      {
        ascending: false,
      }
    );

    if (salesError) {
      throw salesError;
    }

    const {
  data: cashIn,
  error: cashInError,
} = await cashInQuery.order(
  "cash_in_date",
  {
    ascending: false,
  }
);

if (cashInError) {
  throw cashInError;
}

    const {
      data: purchases,
      error: purchaseError,
    } = await purchaseQuery.order(
      "created_at",
      {
        ascending: false,
      }
    );

    if (purchaseError) {
      throw purchaseError;
    }

    const {
      data: expenses,
      error: expenseError,
    } = await expenseQuery.order(
      "expense_date",
      {
        ascending: false,
      }
    );

    if (expenseError) {
      throw expenseError;
    }

    const totalSales =
      sales?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.total),
        0
      ) ?? 0;

      const totalCashIn =
  cashIn?.reduce(
    (sum: number, item: any) =>
      sum + Number(item.amount),
    0
  ) ?? 0;

const totalIncome =
  totalSales +
  totalCashIn;

    const totalPurchases =
      purchases?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.total),
        0
      ) ?? 0;

    const totalExpenses =
      expenses?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.amount),
        0
      ) ?? 0;

      const totalExpense =
  totalPurchases +
  totalExpenses;

    const grossProfit =
  totalIncome -
  totalPurchases;

    const netProfit =
  totalIncome -
  totalPurchases -
  totalExpenses;

    const saleHistory: FinanceHistoryItem[] =
      (sales ?? []).map(
        (sale: any) => ({
          id: sale.id,
          type: "SALE",
          invoice: sale.invoice,
          total: Number(sale.total),
          status: sale.status ?? "-",
          created_at: sale.created_at,
        })
      );

      const cashInHistory: FinanceHistoryItem[] =
  (cashIn ?? []).map(
    (item: any) => ({
      id: item.id,
      type: "CASH_IN",
      invoice:
        item.receipt_number ??
        item.title,
      total: Number(item.amount),
      status: "SUCCESS",
      created_at:
        item.cash_in_date,
    })
  );

    const purchaseHistory: FinanceHistoryItem[] =
      (purchases ?? []).map(
        (purchase: any) => ({
          id: purchase.id,
          type: "PURCHASE",
          invoice:
            purchase.invoice_number,
          total: Number(
            purchase.total
          ),
          status:
            purchase.status ?? "-",
          created_at:
            purchase.created_at,
        })
      );

    const expenseHistory: FinanceHistoryItem[] =
      (expenses ?? []).map(
        (expense: any) => ({
          id: expense.id,
          type: "EXPENSE",
          invoice:
            expense.receipt_number ??
            "-",
          total: Number(
            expense.amount
          ),
          status: "SUCCESS",
          created_at:
            expense.expense_date,
        })
      );

        const history = [
  ...saleHistory,
  ...cashInHistory,
  ...purchaseHistory,
  ...expenseHistory,
    ].sort(
      (a, b) =>
        new Date(
          b.created_at
        ).getTime() -
        new Date(
          a.created_at
        ).getTime()
    );

    const chartMap = new Map<
  string,
  FinanceChartItem
>();

history.forEach((item) => {
  const date = new Date(
    item.created_at
  ).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "2-digit",
    }
  );

  if (!chartMap.has(date)) {
    chartMap.set(date, {
      date,

      income: 0,

      purchase: 0,

      cashOut: 0,

      expense: 0,

      grossProfit: 0,

      netProfit: 0,
    });
  }

  const row =
    chartMap.get(date)!;

  switch (item.type) {
  case "SALE":
    row.income += item.total;
    break;

  case "CASH_IN":
    row.income += item.total;
    break;

  case "PURCHASE":
    row.purchase += item.total;
    break;

  case "EXPENSE":
    row.cashOut += item.total;
    break;
}

  row.expense =
  row.purchase +
  row.cashOut;

row.grossProfit =
  row.income -
  row.purchase;

row.netProfit =
  row.grossProfit -
  row.cashOut;
});

const chart = [
  ...chartMap.values(),
].sort(
  (a, b) => {
    const [da, ma] =
      a.date.split("/");

    const [db, mb] =
      b.date.split("/");

    const dateA =
      new Date(
        2025,
        Number(ma) - 1,
        Number(da)
      );

    const dateB =
      new Date(
        2025,
        Number(mb) - 1,
        Number(db)
      );

    return (
      dateA.getTime() -
      dateB.getTime()
    );
  }
);

    return {
      summary: {
  totalSales,

  totalCashIn,

  totalIncome,

  totalPurchases,

  totalExpenses,

  totalExpense,

  grossProfit,

  netProfit,

  totalTransactions:
    sales?.length ?? 0,

  totalPurchaseOrders:
    purchases?.length ?? 0,

  totalCashOut:
    expenses?.length ?? 0,

  totalCashInTransactions:
    cashIn?.length ?? 0,
},

      history,

      chart,
    };
  },
};