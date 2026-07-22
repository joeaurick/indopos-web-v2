"use client";

import {
  useEffect,
  useState,
} from "react";

import { notify } from "@/lib/notify";

import { useProductStore } from "@/features/products/store/product.store";

import { useAdjustmentStore } from "../store/adjustment.store";

type Props = {
  businessId: string;
  onSuccess?: () => void;
};

export function AdjustmentForm({
  businessId,
  onSuccess,
}: Props) {
  const products =
    useProductStore(
      (state) => state.products
    );

  const fetchProducts =
    useProductStore(
      (state) => state.fetchProducts
    );

  const createAdjustment =
    useAdjustmentStore(
      (state) => state.createAdjustment
    );

  const loading =
    useAdjustmentStore(
      (state) => state.loading
    );

  const [
    productId,
    setProductId,
  ] = useState("");

  const [
    type,
    setType,
  ] = useState<
    "IN" | "OUT" | "ADJUSTMENT"
  >("IN");

  const [qty, setQty] =
    useState(1);

  const [note, setNote] =
    useState("");

  useEffect(() => {
    fetchProducts(businessId);
  }, [
    businessId,
    fetchProducts,
  ]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!productId) {
      notify.error(
        "Pilih produk."
      );
      return;
    }

    if (qty <= 0) {
      notify.error(
        "Qty harus lebih dari 0."
      );
      return;
    }

    const loadingToast =
      notify.loading(
        "Menyimpan adjustment..."
      );

    try {
      await createAdjustment(
        businessId,
        {
          product_id: productId,
          qty,
          type,
          note:
            note.trim() || null,
        }
      );

      notify.dismiss(
        loadingToast
      );

      notify.success(
        "Adjustment berhasil."
      );

      setProductId("");
      setQty(1);
      setType("IN");
      setNote("");

      onSuccess?.();
    } catch (error: any) {
      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Gagal menyimpan adjustment."
      );
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Produk
        </label>

        <select
          value={productId}
          onChange={(e) =>
            setProductId(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            Pilih Produk
          </option>

          {products.map(
            (product) => (
              <option
                key={
                  product.id
                }
                value={
                  product.id
                }
              >
                {product.name}
                {" "}
                (Stock:
                {" "}
                {product.stock}
                )
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Jenis
        </label>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target
                .value as
                | "IN"
                | "OUT"
                | "ADJUSTMENT"
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="IN">
            Stock Masuk
          </option>

          <option value="OUT">
            Stock Keluar
          </option>

          <option value="ADJUSTMENT">
            Set Stock
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Qty
        </label>

        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) =>
            setQty(
              Number(
                e.target.value
              )
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Catatan
        </label>

        <textarea
          rows={3}
          value={note}
          onChange={(e) =>
            setNote(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-teal-600 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
      >
        {loading
          ? "Menyimpan..."
          : "Simpan Adjustment"}
      </button>
    </form>
  );
}