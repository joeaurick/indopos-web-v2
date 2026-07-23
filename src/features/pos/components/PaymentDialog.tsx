"use client";

import { useMemo, useState } from "react";

import {
  Banknote,
  CreditCard,
  QrCode,
} from "lucide-react";

import { useCartStore } from "@/features/pos/store/cart-store";
import { notify } from "@/lib/notify";

import { AppButton } from "@/components/ui";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

type Props = {
  open: boolean;
  onClose: () => void;

  onPay: (
    paymentMethod: string,
    paymentAmount: number
  ) => Promise<void>;
};

export function PaymentDialog({
  open,
  onClose,
  onPay,
}: Props) {
  const subtotal = useCartStore((state) =>
    state.subtotal()
  );

  const [paymentMethod, setPaymentMethod] =
    useState("CASH");

  const [cash, setCash] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const cashValue =
    Number(cash) || 0;

  const change = useMemo(() => {
    if (paymentMethod !== "CASH") return 0;

    return Math.max(
      cashValue - subtotal,
      0
    );
  }, [
    subtotal,
    cashValue,
    paymentMethod,
  ]);

  if (!open) return null;

  const quickCash = [
    50000,
    100000,
    200000,
    subtotal,
  ];

  async function handlePay() {
    if (
      paymentMethod === "CASH" &&
      cashValue < subtotal
    ) {
      notify.error(
        "Nominal pembayaran kurang."
      );
      return;
    }

    const toast =
      notify.loading(
        "Memproses pembayaran..."
      );

    try {
      setLoading(true);

      await onPay(
        paymentMethod,
        paymentMethod === "CASH"
          ? cashValue
          : subtotal
      );

      notify.dismiss(toast);
      notify.success(
        "Pembayaran berhasil."
      );

      setCash("");
      onClose();
    } catch (e) {
      console.error(e);

      notify.dismiss(toast);

      notify.error(
        "Pembayaran gagal."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl">

        {/* HEADER */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Pembayaran
          </h2>

          <p className="mt-2 text-[var(--text-muted)]">
            Selesaikan transaksi pelanggan.
          </p>

        </div>

        {/* TOTAL */}

        <div className="mb-8 rounded-3xl bg-[var(--primary)] p-7 text-white">

          <p className="text-sm opacity-80">
            TOTAL PEMBAYARAN
          </p>

          <h1 className="mt-2 text-5xl font-bold tracking-tight">
            Rp{" "}
            {subtotal.toLocaleString(
              "id-ID"
            )}
          </h1>

        </div>

        {/* PAYMENT */}

        <div className="mb-7">

          <p className="mb-4 font-semibold">
            Metode Pembayaran
          </p>

          <div className="grid grid-cols-3 gap-4">

            <button
              type="button"
              onClick={() =>
                setPaymentMethod("CASH")
              }
              className={`rounded-2xl border p-5 transition ${
                paymentMethod === "CASH"
                  ? "border-blue-600 bg-blue-50"
                  : "border-[var(--border)]"
              }`}
            >
              <Banknote
                className="mx-auto mb-3"
                size={30}
              />

              Tunai
            </button>

            <button
              type="button"
              onClick={() =>
                setPaymentMethod("QRIS")
              }
              className={`rounded-2xl border p-5 transition ${
                paymentMethod === "QRIS"
                  ? "border-blue-600 bg-blue-50"
                  : "border-[var(--border)]"
              }`}
            >
              <QrCode
                className="mx-auto mb-3"
                size={30}
              />

              QRIS
            </button>

            <button
              type="button"
              onClick={() =>
                setPaymentMethod(
                  "TRANSFER"
                )
              }
              className={`rounded-2xl border p-5 transition ${
                paymentMethod ===
                "TRANSFER"
                  ? "border-blue-600 bg-blue-50"
                  : "border-[var(--border)]"
              }`}
            >
              <CreditCard
                className="mx-auto mb-3"
                size={30}
              />

              Transfer
            </button>

          </div>

        </div>

        {/* CASH */}

        {paymentMethod === "CASH" && (
          <>
            <div>

              <label className="mb-2 block font-medium">
                Nominal Pembayaran
              </label>

              <CurrencyInput
  value={cash}
  onChange={setCash}
  placeholder="Masukkan nominal"
  className="
    w-full
    rounded-2xl
    border
    border-[var(--border)]
    bg-white
    px-5
    py-4
    text-2xl
    font-bold
    tracking-wide
    outline-none
    transition-all
    focus:border-[var(--primary)]
    focus:ring-4
    focus:ring-emerald-100
  "
/>

            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">

              {quickCash.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
  setCash(String(value))
}
                  className="rounded-xl border border-[var(--border)] bg-[var(--hover)] py-3 text-sm font-semibold transition hover:border-blue-500"
                >
                  {value === subtotal
                    ? "PAS"
                    : `Rp ${(
                        value / 1000
                      ).toFixed(0)}K`}
                </button>
              ))}

            </div>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-6">

              <p className="text-sm text-slate-500">
                Kembalian
              </p>

              <div className="mt-2 text-4xl font-bold text-emerald-600">
                Rp{" "}
                {change.toLocaleString(
                  "id-ID"
                )}
              </div>

            </div>
          </>
        )}

        {/* FOOTER */}

        <div className="mt-8 flex gap-4">

          <AppButton
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </AppButton>

          <AppButton
            className="flex-1"
            onClick={handlePay}
            disabled={loading}
          >
            {loading
              ? "Memproses..."
              : "Bayar Sekarang"}
          </AppButton>

        </div>

      </div>

    </div>
  );
}