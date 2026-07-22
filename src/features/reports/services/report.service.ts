import { getSupabaseClient } from "@/services/supabase/client";
const supabase = getSupabaseClient();

import {
  ReportData,
  ReportFilter,
  ReportHistoryItem,
} from "../types";

export const reportService = {
  async getReports(
    businessId: string,
    filter?: ReportFilter
  ): Promise<ReportData> {
  const {
  data: business,
  error: businessError,
} = await supabase
  .from("businesses")
  .select(`
    id,
    name,
    address,
    phone,
    email,
    logo_url,
    receipt_footer
  `)
  .eq("id", businessId)
  .single();

if (businessError) {
  throw businessError;
}  
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
        receipt_number,
        expense_date
      `)
      .eq("business_id", businessId)
      .eq("is_active", true);

    // FILTER akan ditambahkan setelah ini

    if (filter) {
  const now = new Date();

  let start: Date | null = null;
  let end: Date | null = null;

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

    cashInQuery = cashInQuery
      .gte(
        "cash_in_date",
        start.toISOString().slice(0, 10)
      )
      .lte(
        "cash_in_date",
        end.toISOString().slice(0, 10)
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
  totalExpense;

const totalTransactions =
  (sales?.length ?? 0) +
  (cashIn?.length ?? 0) +
  (purchases?.length ?? 0) +
  (expenses?.length ?? 0);

  const saleHistory: ReportHistoryItem[] =
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

const cashInHistory: ReportHistoryItem[] =
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

const purchaseHistory: ReportHistoryItem[] =
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

const expenseHistory: ReportHistoryItem[] =
  (expenses ?? []).map(
    (expense: any) => ({
      id: expense.id,
      type: "EXPENSE",
      invoice:
        expense.receipt_number ??
        expense.title ??
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

// ======================
// Product Report
// ======================

const { data: saleItems } =
  await supabase
    .from("sale_items")
    .select(`
      quantity,
      subtotal,
      products (
        id,
        name
      )
    `)
    .eq("business_id", businessId);

const productMap = new Map<
  string,
  {
    id: string;
    name: string;
    qty: number;
    omzet: number;
    profit: number;
    percentage: number;
  }
>();

saleItems?.forEach((item: any) => {
  const product =
    item.products;

  if (!product) return;

  if (
    !productMap.has(product.id)
  ) {
    productMap.set(product.id, {
      id: product.id,
      name: product.name,
      qty: 0,
      omzet: 0,
      profit: 0,
      percentage: 0,
    });
  }

  const row =
    productMap.get(product.id)!;

  row.qty += Number(
    item.quantity
  );

  row.omzet += Number(
    item.subtotal
  );

  // sementara profit = omzet
  row.profit =
    row.omzet;
});

const products =
  [...productMap.values()]
    .sort(
      (a, b) =>
        b.omzet -
        a.omzet
    );

const totalOmzet =
  products.reduce(
    (sum, item) =>
      sum + item.omzet,
    0
  );

products.forEach((item) => {
  item.percentage =
    totalOmzet === 0
      ? 0
      : Number(
          (
            (item.omzet /
              totalOmzet) *
            100
          ).toFixed(1)
        );
});

    return {
  business: {
    id: business.id,
    name: business.name,
    address: business.address ?? "",
    phone: business.phone ?? "",
    email: business.email ?? "",
    logo_url: business.logo_url,
    receipt_footer:
      business.receipt_footer ??
      "Terima kasih telah berbelanja.",
  },

  summary: {
    totalSales,

    totalCashIn,

    totalIncome,

    totalPurchases,

    totalExpenses,

    totalExpense,

    grossProfit,

    netProfit,

    totalTransactions,
  },

  history,

  products,
};
  },
};