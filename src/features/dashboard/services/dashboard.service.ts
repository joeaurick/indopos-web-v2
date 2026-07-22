import { getSupabaseClient } from "@/services/supabase/client";
import { DashboardData } from "../types";

export const dashboardService = {
  async getDashboard(
  businessId: string
): Promise<DashboardData> {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const supabase = getSupabaseClient();

    // ======================
    // Sales Hari Ini
    // ======================

    const { data: todaySales } =
  await supabase
    .from("sales")
    .select("*")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .gte(
      "created_at",
      today.toISOString()
    );

    // ======================
    // Cash In Hari Ini
    // ======================

    const { data: todayCashIn } =
  await supabase
    .from("cash_in")
    .select("amount")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .gte(
      "cash_in_date",
      today
        .toISOString()
        .slice(0, 10)
    );

    // ======================
    // Purchase Hari Ini
    // ======================

    const {
  data: todayPurchases,
} = await supabase
  .from("purchase_orders")
  .select("total")
  .eq("business_id", businessId)
  .eq("is_active", true)
  .gte(
    "created_at",
    today.toISOString()
  );

    // ======================
    // Cash Out Hari Ini
    // ======================

    const {
  data: todayCashOut,
} = await supabase
  .from("expenses")
  .select("amount")
  .eq("business_id", businessId)
  .eq("is_active", true)
  .gte(
    "expense_date",
    today
      .toISOString()
      .slice(0, 10)
  );

    // ======================
    // Summary
    // ======================

    const totalSales =
  todaySales?.reduce(
    (sum: number, item: any) =>
      sum + Number(item.total),
    0
  ) ?? 0;

    const totalCashIn =
      todayCashIn?.reduce(
        (
          sum: number, item: any
        ) =>
          sum +
          Number(item.amount),
        0
      ) ?? 0;

    const totalPurchases =
      todayPurchases?.reduce(
        (
          sum: number, item: any
        ) =>
          sum +
          Number(item.total),
        0
      ) ?? 0;

    const totalCashOut =
      todayCashOut?.reduce(
        (
          sum: number, item: any
        ) =>
          sum +
          Number(item.amount),
        0
      ) ?? 0;

    const totalIncome =
      totalSales +
      totalCashIn;

    const totalExpense =
      totalPurchases +
      totalCashOut;

    const totalProfit =
      totalIncome -
      totalExpense;

    const totalTransactions =
      (todaySales?.length ?? 0) +
      (todayCashIn?.length ??
        0) +
      (todayPurchases?.length ??
        0) +
      (todayCashOut?.length ??
        0);

    // ======================
    // Total Produk
    // ======================

    const { count: productCount } =
      await supabase
  .from("products")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("business_id", businessId);

    // ======================
// Total Customer
// ======================

const { count: customerCount } =
  await supabase
  .from("customers")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("business_id", businessId)
  .eq("is_active", true);

// ======================
// Total Supplier
// ======================

const { count: supplierCount } =
  await supabase
  .from("suppliers")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("business_id", businessId)
  .eq("is_active", true);  

    // ======================
    // Low Stock
    // ======================

    const { data: lowStockProducts } =
  await supabase
  .from("products")
  .select(`
    id,
    name,
    stock,
    minimum_stock
  `)
  .eq("business_id", businessId)
  .lte("stock", 5)
  .order("stock", {
    ascending: true,
  })
  .limit(5);

    // ======================
// Recent Transactions
// ======================

const { data: recentSales } =
  await supabase
    .from("sales")
    .select(`
      id,
      invoice,
      total,
      created_at
    `)
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

const { data: recentCashIn } =
  await supabase
    .from("cash_in")
    .select(`
      id,
      title,
      amount,
      cash_in_date,
      receipt_number
    `)
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("cash_in_date", {
      ascending: false,
    })
    .limit(5);

const { data: recentExpenses } =
  await supabase
    .from("expenses")
    .select(`
      id,
      title,
      amount,
      expense_date,
      receipt_number
    `)
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("expense_date", {
      ascending: false,
    })
    .limit(5);

const recentTransactions = [
  ...(recentSales ?? []).map(
    (item: any) => ({
      id: item.id,
      type: "SALE",
      invoice: item.invoice,
      total: Number(item.total),
      created_at: item.created_at,
    })
  ),

  ...(recentCashIn ?? []).map(
    (item: any) => ({
      id: item.id,
      type: "CASH_IN",
      invoice:
        item.receipt_number ??
        item.title,
      total: Number(item.amount),
      created_at:
        item.cash_in_date,
    })
  ),

  ...(recentExpenses ?? []).map(
    (item: any) => ({
      id: item.id,
      type: "EXPENSE",
      invoice:
        item.receipt_number ??
        item.title,
      total: Number(item.amount),
      created_at:
        item.expense_date,
    })
  ),
]
  .sort(
    (a, b) =>
      new Date(
        b.created_at
      ).getTime() -
      new Date(
        a.created_at
      ).getTime()
  )
  .slice(0, 10);

    // ======================
    // Top Product
    // ======================

    const { data: saleItems } =
      await supabase
  .from("sale_items")
  .select(`
    quantity,
    subtotal,
    products(
      id,
      name
    )
  `)
  .eq("business_id", businessId);

    const productMap = new Map();

saleItems?.forEach((item: any) => {
  if (!item.products) return;

  const product = Array.isArray(item.products)
    ? item.products[0]
    : item.products;

  if (!product) return;

  const id = product.id;

  if (!productMap.has(id)) {
    productMap.set(id, {
      id,
      name: product.name,
      sold: 0,
      revenue: 0,
    });
  }

  productMap.get(id).sold += Number(item.quantity);

  productMap.get(id).revenue += Number(
    item.subtotal ?? 0
  );
});

const topProducts =
  [...productMap.values()]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

    // ======================
// Dashboard Chart 30 Hari
// ======================

const startDate = new Date();

startDate.setDate(
  startDate.getDate() - 29
);

startDate.setHours(0, 0, 0, 0);

const chartMap = new Map<
  string,
  {
    income: number;
    expense: number;
    profit: number;
  }
>();

for (let i = 0; i < 30; i++) {
  const d = new Date(startDate);

  d.setDate(startDate.getDate() + i);

  chartMap.set(
    d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
    }),
    {
      income: 0,
      expense: 0,
      profit: 0,
    }
  );
}

// SALES
const { data: sales30Days } =
  await supabase
  .from("sales")
  .select("created_at,total")
  .eq("business_id", businessId)
  .eq("is_active", true)
  .gte(
    "created_at",
    startDate.toISOString()
  );

sales30Days?.forEach(
  (item: any) => {
    const key = new Date(
      item.created_at
    ).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
    });

    const row =
      chartMap.get(key);

    if (!row) return;

    row.income += Number(
      item.total
    );
  }
);

// CASH IN
const { data: cashIn30Days } =
  await supabase
  .from("cash_in")
  .select("cash_in_date,amount")
  .eq("business_id", businessId)
  .eq("is_active", true)
  .gte(
    "cash_in_date",
    startDate
      .toISOString()
      .slice(0, 10)
  );

cashIn30Days?.forEach(
  (item: any) => {
    const key = new Date(
      item.cash_in_date
    ).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
    });

    const row =
      chartMap.get(key);

    if (!row) return;

    row.income += Number(
      item.amount
    );
  }
);

// PURCHASE
const { data: purchase30Days } =
  await supabase
  .from("purchase_orders")
  .select("created_at,total")
  .eq("business_id", businessId)
  .eq("is_active", true)
  .gte(
    "created_at",
    startDate.toISOString()
  );

purchase30Days?.forEach(
  (item: any) => {
    const key = new Date(
      item.created_at
    ).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
    });

    const row =
      chartMap.get(key);

    if (!row) return;

    row.expense += Number(
      item.total
    );
  }
);

// CASH OUT
const { data: expense30Days } =
  await supabase
  .from("expenses")
  .select("expense_date,amount")
  .eq("business_id", businessId)
  .eq("is_active", true)
  .gte(
    "expense_date",
    startDate
      .toISOString()
      .slice(0, 10)
  );

expense30Days?.forEach(
  (item: any) => {
    const key = new Date(
      item.expense_date
    ).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
    });

    const row =
      chartMap.get(key);

    if (!row) return;

    row.expense += Number(
      item.amount
    );
  }
);

const dailySales =
  [...chartMap.entries()].map(
    ([date, row]) => ({
      date,
      income: row.income,
      expense: row.expense,
      profit:
        row.income -
        row.expense,
    })
  );

// ======================
// Payment Method
// ======================

const { data: paymentSales } =
  await supabase
  .from("sales")
  .select(`
    payment_method,
    total
  `)
  .eq("business_id", businessId)
  .eq("is_active", true);

const paymentMap = new Map<
  string,
  {
    method: string;
    total: number;
    count: number;
  }
>();

paymentSales?.forEach((item: any) => {
  const method =
    item.payment_method ?? "Lainnya";

  if (!paymentMap.has(method)) {
    paymentMap.set(method, {
      method,
      total: 0,
      count: 0,
    });
  }

  const row = paymentMap.get(method)!;

  row.total += Number(item.total);

  row.count += 1;
});

const paymentMethods =
  [...paymentMap.values()].sort(
    (a, b) => b.total - a.total
  );

    // ======================
    // Aktivitas
    // ======================

    const { data: activities } =
      await supabase
  .from("stock_movements")
  .select(`
    id,
    reference_type,
    reference_id,
    movement_type,
    note,
    created_at
  `)
  .eq("business_id", businessId)
  .order("created_at", {
    ascending: false,
  })
  .limit(5);

    return {
  summary: {
    todaySales: totalSales,
    todayCashIn: totalCashIn,
    todayIncome: totalIncome,
    todayExpense: totalExpense,
    todayProfit: totalProfit,
    todayTransactions: totalTransactions,
    totalProducts: productCount ?? 0,
    lowStock: lowStockProducts?.length ?? 0,
    totalCustomers: customerCount ?? 0,
    totalSuppliers: supplierCount ?? 0,
    cashBalance: totalIncome - totalExpense,
  },

  recentSales: recentSales ?? [],

  recentTransactions,

  topProducts,

  dailySales,

  activities: activities ?? [],

  lowStockProducts: lowStockProducts ?? [],

  cashFlow: {
    cashIn: totalCashIn,
    cashOut: totalPurchases + totalCashOut,
    balance: totalIncome - totalExpense,
  },
  paymentMethods,
};

  },
};