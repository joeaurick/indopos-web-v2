import { getSupabaseClient } from "@/services/supabase/client";

import {
  Product,
  ProductPayload,
} from "../types";

const supabase = getSupabaseClient();

export const productService = {
  async getProducts(
    businessId: string
  ): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("name", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return (data ?? []).map((item: any) => ({
      id: item.id,
      name: item.name,
      sku: item.sku,
      price: item.price,
      stock: item.stock,

      category_id: item.category_id,

      category_name:
        item.categories?.name ?? null,

      is_active: item.is_active,

      created_at: item.created_at,
    }));
  },

  async createProduct(
    businessId: string,
    payload: ProductPayload
  ) {
    const { data, error } = await supabase
      .from("products")
      .insert({
        ...payload,
        business_id: businessId,
        is_active: true,
      })
      .select(`
        *,
        categories (
          name
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async updateProduct(
    businessId: string,
    id: string,
    payload: ProductPayload
  ) {
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .eq("business_id", businessId)
      .select(`
        *,
        categories (
          name
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async deleteProduct(
    businessId: string,
    id: string
  ) {
    const { error } = await supabase
      .from("products")
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