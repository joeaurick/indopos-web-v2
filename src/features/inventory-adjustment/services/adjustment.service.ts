import { getSupabaseClient } from "@/services/supabase/client";

const supabase = getSupabaseClient();

import {
  Adjustment,
  AdjustmentPayload,
} from "../types";

export const adjustmentService = {
  async getAdjustments(
    businessId: string
  ): Promise<Adjustment[]> {
    const { data, error } = await supabase
      .from("stock_movements")
      .select(`
        *,
        products (
          name,
          sku
        )
      `)
      .eq("business_id", businessId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return (data ?? []).map((item: any) => ({
      id: item.id,

      product_id: item.product_id,

      product_name:
        item.products?.name ?? "-",

      sku:
        item.products?.sku ?? "-",

      stock_before:
        Number(item.stock_before),

      stock_after:
        Number(item.stock_after),

      qty:
        Number(item.qty),

      type:
        item.movement_type,

      note:
        item.note,

      created_at:
        item.created_at,
    }));
  },

  async createAdjustment(
    businessId: string,
    payload: AdjustmentPayload
  ) {
    const {
      data: product,
      error: productError,
    } = await supabase
      .from("products")
      .select("stock")
      .eq("business_id", businessId)
      .eq("id", payload.product_id)
      .single();

    if (productError) {
      throw productError;
    }

    const before = Number(product.stock);

    let after = before;

    switch (payload.type) {
      case "IN":
        after += payload.qty;
        break;

      case "OUT":
        after -= payload.qty;
        break;

      case "ADJUSTMENT":
        after = payload.qty;
        break;
    }

    if (after < 0) {
      after = 0;
    }

    const { error: updateError } =
      await supabase
        .from("products")
        .update({
          stock: after,
        })
        .eq("business_id", businessId)
        .eq("id", payload.product_id);

    if (updateError) {
      throw updateError;
    }

    const { error: movementError } =
      await supabase
        .from("stock_movements")
        .insert({
          business_id: businessId,

          product_id:
            payload.product_id,

          reference_type:
            "ADJUSTMENT",

          reference_id: null,

          movement_type:
            payload.type,

          qty: payload.qty,

          stock_before: before,

          stock_after: after,

          note: payload.note,
        });

    if (movementError) {
      throw movementError;
    }
  },
};