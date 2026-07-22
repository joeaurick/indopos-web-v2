import { getSupabaseClient } from "@/services/supabase/client";

import {
  CashOutData,
  CashOutFilter,
  Expense,
} from "../types";

const supabase = getSupabaseClient();

export const cashOutService = {
  async getCashOut(
    businessId: string,
    filter?: Partial<CashOutFilter>
  ): Promise<CashOutData> {
    // ==========================
    // Categories
    // ==========================

    const {
      data: categories,
      error: categoryError,
    } = await supabase
      .from("expense_categories")
      .select("*")
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("name");

    if (categoryError) {
      throw categoryError;
    }

    // ==========================
    // Expenses
    // ==========================

    let query = supabase
      .from("expenses")
      .select(`
        *,
        category:expense_categories(
          id,
          name,
          color,
          icon,
          is_active
        )
      `)
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("expense_date", {
        ascending: false,
      });

    if (
      filter?.categoryId &&
      filter.categoryId !== ""
    ) {
      query = query.eq(
        "category_id",
        filter.categoryId
      );
    }

    if (
      filter?.startDate &&
      filter.startDate !== ""
    ) {
      query = query.gte(
        "expense_date",
        filter.startDate
      );
    }

    if (
      filter?.endDate &&
      filter.endDate !== ""
    ) {
      query = query.lte(
        "expense_date",
        filter.endDate
      );
    }

    const {
      data: expenses,
      error: expenseError,
    } = await query;

    if (expenseError) {
      throw expenseError;
    }

    let rows =
      (expenses as Expense[]) ?? [];

    if (
      filter?.search &&
      filter.search.trim() !== ""
    ) {
      const keyword =
        filter.search.toLowerCase();

      rows = rows.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(keyword) ||
          (item.description ?? "")
            .toLowerCase()
            .includes(keyword) ||
          (item.receipt_number ?? "")
            .toLowerCase()
            .includes(keyword)
      );
    }

    // ==========================
    // Summary
    // ==========================

    const today = new Date()
      .toISOString()
      .slice(0, 10);

    const currentMonth =
      new Date().getMonth();

    const currentYear =
      new Date().getFullYear();

    const totalExpense =
      rows.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    const todayExpense =
      rows
        .filter(
          (item) =>
            item.expense_date ===
            today
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(item.amount),
          0
        );

    const monthExpense =
      rows
        .filter((item) => {
          const date = new Date(
            item.expense_date
          );

          return (
            date.getMonth() ===
              currentMonth &&
            date.getFullYear() ===
              currentYear
          );
        })
        .reduce(
          (sum, item) =>
            sum +
            Number(item.amount),
          0
        );

    return {
      summary: {
        totalExpense,
        totalTransaction:
          rows.length,
        todayExpense,
        monthExpense,
      },

      categories:
        categories ?? [],

      expenses: rows,
    };
  },

  // ==========================
  // Upload Receipt
  // ==========================

  async uploadReceipt(
    file: File
  ): Promise<string> {
    const extension =
      file.name
        .split(".")
        .pop();

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const filePath = `receipts/${fileName}`;

    const { error } =
      await supabase.storage
        .from(
          "expense-receipts"
        )
        .upload(
          filePath,
          file,
          {
            upsert: false,
          }
        );

    if (error) {
      throw error;
    }

    const { data } =
      supabase.storage
        .from(
          "expense-receipts"
        )
        .getPublicUrl(
          filePath
        );

    return data.publicUrl;
  },

  // ==========================
  // Delete Receipt
  // ==========================

  async deleteReceipt(
    publicUrl: string
  ) {
    const marker =
      "/expense-receipts/";

    const index =
      publicUrl.indexOf(
        marker
      );

    if (index === -1) return;

    const filePath =
      publicUrl.substring(
        index +
          marker.length
      );

    const { error } =
      await supabase.storage
        .from(
          "expense-receipts"
        )
        .remove([
          filePath,
        ]);

    if (error) {
      throw error;
    }
  },

  // ==========================
  // Create
  // ==========================

  async createExpense(
    businessId: string,
    data: {
      category_id:
        | string
        | null;
      title: string;
      description?: string;
      amount: number;
      payment_method: string;
      expense_date: string;
      receipt_number?: string;
      attachment_url?:
        | string
        | null;
    }
  ) {
    const { error } =
      await supabase
        .from("expenses")
        .insert({
          ...data,
          business_id:
            businessId,
        });

    if (error) {
      throw error;
    }
  },

  // ==========================
  // Update
  // ==========================

  async updateExpense(
    businessId: string,
    id: string,
    data: Partial<Expense>
  ) {
    const { error } =
      await supabase
        .from("expenses")
        .update(data)
        .eq(
          "business_id",
          businessId
        )
        .eq("id", id);

    if (error) {
      throw error;
    }
  },

  // ==========================
  // Delete
  // ==========================

  async deleteExpense(
    businessId: string,
    id: string
  ) {
    const { error } =
      await supabase
        .from("expenses")
        .update({
          is_active: false,
        })
        .eq(
          "business_id",
          businessId
        )
        .eq("id", id);

    if (error) {
      throw error;
    }
  },
};