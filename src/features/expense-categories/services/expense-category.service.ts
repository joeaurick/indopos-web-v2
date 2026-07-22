import { getSupabaseClient } from "@/services/supabase/client";

const supabase = getSupabaseClient();

import {
  ExpenseCategory,
  ExpenseCategoryFormData,
} from "../types";

export const expenseCategoryService = {
  async getCategories(): Promise<
    ExpenseCategory[]
  > {
    const { data, error } =
      await supabase
        .from("expense_categories")
        .select("*")
        .eq("is_active", true)
        .order("name", {
          ascending: true,
        });

    if (error) {
      throw error;
    }

    return (
      (data as ExpenseCategory[]) ?? []
    );
  },

  async createCategory(
    payload: ExpenseCategoryFormData
  ) {
    const { error } =
      await supabase
        .from("expense_categories")
        .insert({
          name: payload.name,
          color: payload.color,
          icon: payload.icon,
        });

    if (error) {
      throw error;
    }
  },

  async updateCategory(
    id: string,
    payload: ExpenseCategoryFormData
  ) {
    const { error } =
      await supabase
        .from("expense_categories")
        .update({
          name: payload.name,
          color: payload.color,
          icon: payload.icon,
        })
        .eq("id", id);

    if (error) {
      throw error;
    }
  },

  async deleteCategory(
    id: string
  ) {
    const { error } =
      await supabase
        .from("expense_categories")
        .update({
          is_active: false,
        })
        .eq("id", id);

    if (error) {
      throw error;
    }
  },
};