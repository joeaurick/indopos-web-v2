import { getSupabaseClient } from "@/services/supabase/client";

import {
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderPayload,
} from "../types";

const supabase = getSupabaseClient();

export const purchaseService = {
  async getPurchases(
    businessId: string
  ): Promise<PurchaseOrder[]> {
    const { data, error } = await supabase
      .from("purchase_orders")
      .select(`
        *,
        suppliers (
          name
        )
      `)
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return (data ?? []).map(
      (item: any) => ({
        id: item.id,

        supplier_id: item.supplier_id,

        supplier_name:
          item.suppliers?.name ?? "-",

        invoice_number:
          item.invoice_number,

        order_date:
          item.order_date,

        status: item.status,

        subtotal: Number(
          item.subtotal ?? 0
        ),

        discount: Number(
          item.discount ?? 0
        ),

        tax: Number(
          item.tax ?? 0
        ),

        total: Number(
          item.total ?? 0
        ),

        note: item.note,

        is_active:
          item.is_active,

        created_at:
          item.created_at,
      })
    );
  },

  async createPurchase(
    businessId: string,
    payload: PurchaseOrderPayload
  ) {
    const {
      items,
      ...header
    } = payload;

    const {
      data: purchase,
      error,
    } = await supabase
      .from("purchase_orders")
      .insert({
        ...header,

        business_id:
          businessId,

        status: "DRAFT",

        is_active: true,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (items.length > 0) {
      const detail = items.map(
        (
          item: PurchaseOrderItem
        ) => ({
          business_id:
            businessId,

          purchase_order_id:
            purchase.id,

          product_id:
            item.product_id,

          qty: item.qty,

          cost_price:
            item.cost_price,

          subtotal:
            item.subtotal,
        })
      );

      const {
        error: detailError,
      } = await supabase
        .from(
          "purchase_order_items"
        )
        .insert(detail);

      if (detailError) {
        throw detailError;
      }
    }

    return purchase;
  },

  async deletePurchase(
    businessId: string,
    id: string
  ) {
    const { error } =
      await supabase
        .from("purchase_orders")
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

  async receivePurchase(
    businessId: string,
    id: string
  ) {
    const {
      data: items,
      error: itemError,
    } = await supabase
      .from(
        "purchase_order_items"
      )
      .select(`
        product_id,
        qty
      `)
      .eq(
        "business_id",
        businessId
      )
      .eq(
        "purchase_order_id",
        id
      );

    if (itemError) {
      throw itemError;
    }

    for (const item of items ?? []) {
      const {
        data: product,
        error: productError,
      } = await supabase
        .from("products")
        .select(`
          id,
          stock
        `)
        .eq(
          "business_id",
          businessId
        )
        .eq(
          "id",
          item.product_id
        )
        .single();

      if (productError) {
        throw productError;
      }

      const stockBefore =
        Number(product.stock);

      const stockAfter =
        stockBefore +
        Number(item.qty);

      const {
        error: updateError,
      } = await supabase
        .from("products")
        .update({
          stock: stockAfter,
        })
        .eq(
          "business_id",
          businessId
        )
        .eq(
          "id",
          item.product_id
        );

      if (updateError) {
        throw updateError;
      }

      const {
        error: movementError,
      } = await supabase
        .from(
          "stock_movements"
        )
        .insert({
          business_id:
            businessId,

          product_id:
            item.product_id,

          reference_type:
            "PURCHASE",

          reference_id: id,

          movement_type:
            "IN",

          qty: item.qty,

          stock_before:
            stockBefore,

          stock_after:
            stockAfter,

          note:
            "Receive Purchase",
        });

      if (movementError) {
        throw movementError;
      }
    }

    const {
      error: statusError,
    } = await supabase
      .from("purchase_orders")
      .update({
        status: "RECEIVED",
      })
      .eq(
        "business_id",
        businessId
      )
      .eq("id", id);

    if (statusError) {
      throw statusError;
    }
  },
};