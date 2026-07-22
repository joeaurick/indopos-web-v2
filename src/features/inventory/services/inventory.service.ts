import { getSupabaseClient } from "@/services/supabase/client";

const supabase = getSupabaseClient();

import {
  InventoryItem,
  StockAdjustmentPayload,
} from "../types";

export const inventoryService = {
  async getInventory(
    businessId: string
  ): Promise<InventoryItem[]> {
    const { data, error } =
      await supabase
        .from("products")
        .select(`
          id,
          name,
          sku,
          stock,
          minimum_stock,
          category_id,
          is_active,
          created_at,
          categories (
            name
          )
        `)
        .eq(
          "business_id",
          businessId
        )
        .eq(
          "is_active",
          true
        )
        .order("name", {
          ascending: true,
        });

    if (error) {
      throw error;
    }

    return (data ?? []).map(
      (item: any) => ({
        id: item.id,

        product_id: item.id,

        product_name:
          item.name,

        sku: item.sku,

        stock: item.stock,

        minimum_stock:
          item.minimum_stock,

        category_id:
          item.category_id,

        category_name:
          item.categories?.name ??
          null,

        is_active:
          item.is_active,

        created_at:
          item.created_at,
      })
    );
  },

  async adjustStock(
    businessId: string,
    payload: StockAdjustmentPayload
  ) {
    const {
      data: product,
      error,
    } = await supabase
      .from("products")
      .select("stock")
      .eq(
        "business_id",
        businessId
      )
      .eq(
        "id",
        payload.product_id
      )
      .single();

    if (error) {
      throw error;
    }

    let newStock =
      product.stock;

    switch (
      payload.type
    ) {
      case "IN":
        newStock +=
          payload.quantity;
        break;

      case "OUT":
        newStock -=
          payload.quantity;
        break;

      case "ADJUSTMENT":
        newStock =
          payload.quantity;
        break;
    }

    if (newStock < 0) {
      newStock = 0;
    }

    const {
      error: updateError,
    } = await supabase
      .from("products")
      .update({
        stock: newStock,
      })
      .eq(
        "business_id",
        businessId
      )
      .eq(
        "id",
        payload.product_id
      );

    if (updateError) {
      throw updateError;
    }

    return newStock;
  },
};