import { getSupabaseClient } from "@/services/supabase/client";

import {
  CashIn,
  CashInData,
  CashInFilter,
} from "../types";

const supabase = getSupabaseClient();

export const cashInService = {
  async getCashIn(
    businessId: string,
    filter?: Partial<CashInFilter>
  ): Promise<CashInData> {
    // ==========================
    // Categories
    // ==========================

    const {
      data: categories,
      error: categoryError,
    } = await supabase
      .from("cash_in_categories")
      .select("*")
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("name");

    if (categoryError) {
      throw categoryError;
    }

    // ==========================
    // Cash In
    // ==========================

    let query = supabase
      .from("cash_in")
      .select(`
        *,
        category:cash_in_categories(
          id,
          name,
          color,
          icon,
          is_active
        )
      `)
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("cash_in_date", {
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
        "cash_in_date",
        filter.startDate
      );
    }

    if (
      filter?.endDate &&
      filter.endDate !== ""
    ) {
      query = query.lte(
        "cash_in_date",
        filter.endDate
      );
    }

    const {
      data: cashIn,
      error,
    } = await query;

    if (error) {
      throw error;
    }

    let rows =
      (cashIn as CashIn[]) ?? [];

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

    const totalIncome =
      rows.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    const todayIncome =
      rows
        .filter(
          (item) =>
            item.cash_in_date ===
            today
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(item.amount),
          0
        );

    const monthIncome =
      rows
        .filter((item) => {
          const date = new Date(
            item.cash_in_date
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
        totalIncome,

        totalTransaction:
          rows.length,

        todayIncome,

        monthIncome,
      },

      categories:
        categories ?? [],

      cashIn: rows,
    };
  },

  async createCashIn(
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
  ) {
    const { error } =
      await supabase
        .from("cash_in")
        .insert({
          ...data,
          business_id: businessId,
          is_active: true,
        });

    if (error) {
      throw error;
    }
  },

  async updateCashIn(
    businessId: string,
    id: string,
    data: Partial<CashIn>
  ) {
    const { error } =
      await supabase
        .from("cash_in")
        .update(data)
        .eq("business_id", businessId)
        .eq("id", id);

    if (error) {
      throw error;
    }
  },

  async deleteCashIn(
    businessId: string,
    id: string
  ) {
    const { error } =
      await supabase
        .from("cash_in")
        .update({
          is_active: false,
        })
        .eq("business_id", businessId)
        .eq("id", id);

    if (error) {
      throw error;
    }
  },
};