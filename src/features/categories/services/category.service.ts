import { getSupabaseClient } from "@/services/supabase/client";

import { Category } from "../types";

const supabase = getSupabaseClient();

type CategoryPayload = {
  name: string;
  description: string | null;
};

export const categoryService = {
  async getCategories(
    businessId: string
  ): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("name");

    if (error) {
      throw error;
    }

    return (data ?? []) as Category[];
  },

  async createCategory(
    businessId: string,
    payload: CategoryPayload
  ): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .insert({
        ...payload,
        business_id: businessId,
        is_active: true,
      });

    if (error) {
      throw error;
    }
  },

  async updateCategory(
    businessId: string,
    id: string,
    payload: CategoryPayload
  ): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", id)
      .eq("business_id", businessId);

    if (error) {
      throw error;
    }
  },

  async deleteCategory(
    businessId: string,
    id: string
  ): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .update({
        is_active: false,
      })
      .eq("id", id)
      .eq("business_id", businessId);

    if (error) {
      throw error;
    }
  },
};