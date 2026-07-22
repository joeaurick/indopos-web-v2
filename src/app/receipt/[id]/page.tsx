import { notFound } from "next/navigation";

import { getSupabaseClient } from "@/services/supabase/client";

const supabase = getSupabaseClient();

import { ReceiptPrint } from "@/features/pos/components/ReceiptPrint";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReceiptPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: sale, error: saleError } =
    await supabase
      .from("sales")
      .select("*")
      .eq("id", id)
      .single();

  if (saleError || !sale) {
    notFound();
  }

  const { data: business } =
    await supabase
      .from("businesses")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .single();

  const { data: items } =
    await supabase
      .from("sale_items")
      .select(`
        quantity,
        price,
        subtotal,
        products (
          id,
          name,
          sku
        )
      `)
      .eq("sale_id", id);

  const receiptItems =
    items?.map((item: any) => ({
      id: item.products.id,
      name: item.products.name,
      sku: item.products.sku,
      qty: Number(item.quantity),
      price: Number(item.price),
      subtotal: Number(item.subtotal),
    })) ?? [];

  return (
    <ReceiptPrint
      invoice={sale.invoice}
      createdAt={sale.created_at}
      total={Number(sale.total)}
      paymentMethod={sale.payment_method}
      paymentAmount={Number(sale.payment_amount)}
      changeAmount={Number(sale.change_amount)}
      business={{
        name: business?.name ?? "IndoPOS",
        address: business?.address ?? "",
        phone: business?.phone ?? "",
        logo_url: business?.logo_url ?? null,
        receipt_footer:
          business?.receipt_footer ??
          "Terima kasih telah berbelanja",
      }}
      items={receiptItems}
    />
  );
}