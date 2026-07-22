"use client";

import { useState } from "react";

import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Package,
} from "lucide-react";

import { AppButton } from "@/components/ui";

import { useCartStore } from "@/features/pos/store/cart-store";
import { useProductStore } from "@/features/products";

import { checkoutService } from "@/features/pos/services/checkout.service";

import { PaymentDialog } from "./PaymentDialog";
import { PaymentSuccessDialog } from "./PaymentSuccessDialog";

type Props = {
  businessId: string;
};

export function CartPanel({
  businessId,
}: Props) {
  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [successOpen, setSuccessOpen] =
    useState(false);

  const [invoice, setInvoice] =
    useState("");

  const [paidTotal, setPaidTotal] =
    useState(0);

  const [saleId, setSaleId] =
    useState("");

  const items = useCartStore(
    (state) => state.items
  );

  const subtotal = useCartStore(
    (state) => state.subtotal()
  );

  const increaseQty = useCartStore(
    (state) => state.increaseQty
  );

  const decreaseQty = useCartStore(
    (state) => state.decreaseQty
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const fetchProducts =
    useProductStore(
      (state) => state.fetchProducts
    );

  const totalQty = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const handlePayment = async (
    paymentMethod: string,
    paymentAmount: number
  ) => {
    const sale =
  await checkoutService.checkout({
    businessId,
    items,
    paymentMethod,
    paymentAmount,
  });

await fetchProducts(businessId);

    setSaleId(sale.id);
    setInvoice(sale.invoice);
    setPaidTotal(Number(sale.total));

    clearCart();

    setPaymentOpen(false);
    setSuccessOpen(true);
  };

  return (
    <>
      <div
        className="
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          rounded-[32px]
          border
          border-[var(--border)]
          bg-[var(--card)]
          shadow-sm
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b
            border-[var(--border)]
            px-6
            py-5
          "
        >
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--primary)]
                  text-white
                "
              >
                <ShoppingCart size={22} />
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Keranjang
                </h2>

                <p className="text-sm text-[var(--text-muted)]">
                  Daftar belanja pelanggan
                </p>

              </div>

            </div>

            <div
              className="
                rounded-full
                bg-[var(--primary)]
                px-3
                py-1
                text-sm
                font-semibold
                text-white
              "
            >
              {totalQty} Item
            </div>

          </div>

        </div>

        {/* BODY */}

        <div className="min-h-0 flex-1 overflow-y-auto p-5">

          {items.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center">

              <div
                className="
                  mb-5
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                "
              >
                <Package
                  size={40}
                  className="text-slate-400"
                />
              </div>

              <h3 className="text-lg font-semibold">
                Keranjang Masih Kosong
              </h3>

              <p className="mt-2 text-center text-sm text-[var(--text-muted)]">
                Pilih produk dari sebelah kiri
                untuk mulai transaksi.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-5
                    transition-all
                    duration-200
                    hover:shadow-md
                  "
                >

                  <div className="flex justify-between gap-4">

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-base font-bold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {item.sku}
                      </p>

                      <div className="mt-4 flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQty(item.id)
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[var(--border)]
                            hover:bg-[var(--hover)]
                          "
                        >
                          <Minus size={16} />
                        </button>

                        <div
                          className="
                            flex
                            h-9
                            min-w-[44px]
                            items-center
                            justify-center
                            rounded-xl
                            bg-[var(--hover)]
                            px-3
                            font-semibold
                          "
                        >
                          {item.qty}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQty(item.id)
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[var(--border)]
                            hover:bg-[var(--hover)]
                          "
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                    </div>

                    <div className="flex flex-col items-end justify-between">

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          text-red-500
                          transition
                          hover:bg-red-50
                        "
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="text-right">

                        <p className="text-sm text-[var(--text-muted)]">
                          Rp{" "}
                          {item.price.toLocaleString(
                            "id-ID"
                          )}
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-[var(--primary)]">
                          Rp{" "}
                          {(
                            item.price *
                            item.qty
                          ).toLocaleString(
                            "id-ID"
                          )}
                        </h3>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* FOOTER */}

        <div
          className="
            border-t
            border-[var(--border)]
            bg-[var(--hover)]
            p-6
          "
        >

          <div className="space-y-3">

            <div className="flex justify-between text-sm">

              <span className="text-[var(--text-muted)]">
                Total Item
              </span>

              <span className="font-semibold">
                {totalQty}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-[var(--text-muted)]">
                Pajak
              </span>

              <span className="font-semibold">
                Rp 0
              </span>

            </div>

            <div className="h-px bg-[var(--border)]" />

            <div className="flex items-center justify-between">

              <span className="text-lg font-semibold">
                Grand Total
              </span>

              <span className="text-3xl font-bold text-[var(--primary)]">
                Rp{" "}
                {subtotal.toLocaleString(
                  "id-ID"
                )}
              </span>

            </div>

            <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">

  <div className="flex items-center justify-between">

    <span className="text-sm text-[var(--text-muted)]">
      Subtotal
    </span>

    <span className="font-semibold">
      Rp {subtotal.toLocaleString("id-ID")}
    </span>

  </div>

  <div className="mt-3 flex items-center justify-between">

    <span className="text-sm text-[var(--text-muted)]">
      Diskon
    </span>

    <span className="font-semibold">
      Rp 0
    </span>

  </div>

  <div className="mt-3 flex items-center justify-between">

    <span className="text-sm text-[var(--text-muted)]">
      Pajak
    </span>

    <span className="font-semibold">
      Rp 0
    </span>

  </div>

  <div className="my-4 h-px bg-[var(--border)]" />

  <div className="flex items-center justify-between">

    <span className="text-base font-bold">
      Total Bayar
    </span>

    <span className="text-2xl font-bold text-[var(--primary)]">
      Rp {subtotal.toLocaleString("id-ID")}
    </span>

  </div>

</div>

          </div>

          <AppButton
  onClick={() => setPaymentOpen(true)}
  disabled={!items.length}
  className="
    mt-6
    h-16
    w-full
    rounded-2xl
    text-lg
    font-bold
    shadow-lg
  "
>
  Bayar Sekarang
</AppButton>

        </div>

      </div>

      <PaymentDialog
        open={paymentOpen}
        onClose={() =>
          setPaymentOpen(false)
        }
        onPay={handlePayment}
      />

      <PaymentSuccessDialog
        open={successOpen}
        invoice={invoice}
        total={paidTotal}
        onClose={() =>
          setSuccessOpen(false)
        }
        onPrint={() => {
          window.open(
            `/receipt/${saleId}`,
            "_blank"
          );
        }}
      />

    </>
  );
}