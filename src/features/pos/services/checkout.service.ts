import { getSupabaseClient } from "@/services/supabase/client";
const supabase = getSupabaseClient();
import { CartItem } from "../types";

function generateInvoice() {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `INV-${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
}

type CheckoutPayload = {
  businessId: string;
  items: CartItem[];
  paymentMethod: string;
  paymentAmount: number;
};

export const checkoutService = {
  async checkout({
  businessId,
  items,
  paymentMethod,
  paymentAmount,
}: CheckoutPayload) {
    const invoice = generateInvoice();

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const discount = 0;

    const tax = 0;

    const total =
      subtotal - discount + tax;

    const changeAmount = Math.max(
      paymentAmount - total,
      0
    );

    // ==========================
    // SALES
    // ==========================

    const {
      data: sale,
      error: saleError,
    } = await supabase
      .from("sales")
      .insert({
  business_id: businessId,

  invoice,

  customer_id: null,

        subtotal,

        discount,

        tax,

        total,

        payment_method:
          paymentMethod,

        payment_amount:
          paymentAmount,

        change_amount:
          changeAmount,

        status: "PAID",

        note: null,

        is_active: true,
      })
      .select()
      .single();

    if (saleError) {
      throw saleError;
    }

    // ==========================
    // SALE ITEMS
    // ==========================

    const saleItems = items.map(
  (item) => ({
    business_id: businessId,

    sale_id: sale.id,

    product_id: item.id,

        quantity: item.qty,

        price: item.price,

        subtotal:
          item.qty * item.price,
      })
    );

    const {
      error: itemError,
    } = await supabase
      .from("sale_items")
      .insert(saleItems);

    if (itemError) {
      throw itemError;
    }

    // ==========================
    // UPDATE STOCK
    // ==========================

    for (const item of items) {
      const {
        data: product,
        error: productError,
      } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
.eq("business_id", businessId)
.single();

      if (productError) {
        throw productError;
      }

      const before = Number(
        product.stock
      );

      const after = Math.max(
        before - item.qty,
        0
      );

      const {
        error: updateError,
      } = await supabase
        .from("products")
        .update({
  stock: after,
})
.eq("id", item.id)
.eq("business_id", businessId);

      if (updateError) {
        throw updateError;
      }

      // ==========================
      // STOCK MOVEMENT
      // ==========================

      const {
        error: movementError,
      } = await supabase
        .from("stock_movements")
        .insert({
  business_id: businessId,

  product_id: item.id,

          reference_type: "SALE",

          reference_id: sale.id,

          movement_type: "OUT",

          qty: item.qty,

          stock_before: before,

          stock_after: after,

          note: invoice,
        });

      if (movementError) {
        throw movementError;
      }
    }

    return sale;
  },
};