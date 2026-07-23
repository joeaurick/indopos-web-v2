"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { notify } from "@/lib/notify";
import { getToday } from "@/lib/date";

import { Product } from "@/features/products";
import { useSupplierStore } from "@/features/suppliers/store/supplier.store";

import { usePurchaseStore } from "../store/purchase.store";

import { ProductSelector } from "./ProductSelector";
import { PurchaseItemTable } from "./PurchaseItemTable";
import { PurchaseSummary } from "./PurchaseSummary";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

import {
  PurchaseItem,
  usePurchaseItems,
} from "../hooks/usePurchaseItems";

type Props = {
  businessId: string;
  onSuccess?: () => void;
};

export function PurchaseForm({
  businessId,
  onSuccess,
}: Props) {

  const suppliers =
    useSupplierStore(
      (state) => state.suppliers
    );

  const fetchSuppliers =
    useSupplierStore(
      (state) => state.fetchSuppliers
    );

  const createPurchase =
    usePurchaseStore(
      (state) => state.createPurchase
    );

  const loading =
    usePurchaseStore(
      (state) => state.loading
    );

  useEffect(() => {
  fetchSuppliers(businessId);
}, [businessId, fetchSuppliers]);

  const {
    items,
    subtotal,
    addProduct,
    updateQty,
    updatePrice,
    removeProduct,
    setItems,
  } = usePurchaseItems();

  const [
    supplierId,
    setSupplierId,
  ] = useState("");

  const [
    invoiceNumber,
    setInvoiceNumber,
  ] = useState(
    `PO-${Date.now()}`
  );

  const [
    orderDate,
    setOrderDate,
  ] = useState(
    getToday()
  );

  const [
    discount,
    setDiscount,
  ] = useState(0);

  const [
    tax,
    setTax,
  ] = useState(0);

  const [
    note,
    setNote,
  ] = useState("");

  const total =
    useMemo(() => {
      return (
        subtotal -
        discount +
        tax
      );
    }, [
      subtotal,
      discount,
      tax,
    ]);

  function handleSelectProduct(
    product: Product
  ) {

    addProduct(product);

  }

  async function handleSubmit(
    e: FormEvent
  ) {

    e.preventDefault();

    if (!supplierId) {

      notify.warning(
        "Supplier wajib dipilih."
      );

      return;

    }

    if (items.length === 0) {

      notify.warning(
        "Belum ada produk."
      );

      return;

    }

    const loadingToast =
      notify.loading(
        "Menyimpan purchase..."
      );

    try {

      await createPurchase(
  businessId,
  {

        supplier_id:
          supplierId,

        invoice_number:
          invoiceNumber,

        order_date:
          orderDate,

        subtotal,

        discount,

        tax,

        total,

        note:
          note.trim() || null,

                items: items.map(
          (
            item: PurchaseItem
          ) => ({
            product_id:
              item.product_id,

            product_name:
              item.product_name,

            qty: item.qty,

            cost_price:
              item.cost_price,

            subtotal:
              item.subtotal,
          })
        ),

      }
);

      notify.dismiss(
        loadingToast
      );

      notify.success(
        "Purchase berhasil disimpan."
      );

      setSupplierId("");

      setItems([]);

      setDiscount(0);

      setTax(0);

      setNote("");

      setInvoiceNumber(
        `PO-${Date.now()}`
      );

      setOrderDate(
        getToday()
      );

      onSuccess?.();

    } catch (error: any) {

      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Gagal menyimpan purchase."
      );

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6 pb-24 lg:pb-0"
    >

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Supplier
          </label>

          <select
            value={supplierId}
            onChange={(e) =>
              setSupplierId(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3 text-sm lg:text-base"
          >

            <option value="">
              Pilih Supplier
            </option>

            {suppliers.map(
              (
                supplier
              ) => (

                <option
                  key={
                    supplier.id
                  }
                  value={
                    supplier.id
                  }
                >
                  {
                    supplier.name
                  }
                </option>

              )
            )}

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Invoice
          </label>

          <input
            value={
              invoiceNumber
            }
            onChange={(e) =>
              setInvoiceNumber(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Tanggal
          </label>

          <input
            type="date"
            value={orderDate}
            onChange={(e) =>
              setOrderDate(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

      </div>

      <ProductSelector
  businessId={businessId}
  onSelect={
    handleSelectProduct
  }
/>

      <PurchaseItemTable
        items={items}
        onQtyChange={
          updateQty
        }
        onPriceChange={
          updatePrice
        }
        onDelete={
          removeProduct
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="space-y-4">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Diskon
            </label>

            <CurrencyInput
  value={String(discount)}
  onChange={(value) =>
    setDiscount(Number(value))
  }
  className="w-full rounded-xl border px-4 py-3"
/>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Pajak
            </label>

            <CurrencyInput
  value={String(tax)}
  onChange={(value) =>
    setTax(Number(value))
  }
  className="w-full rounded-xl border px-4 py-3"
/>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Catatan
            </label>

            <textarea
              rows={4}
              value={note}
              onChange={(e) =>
                setNote(
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

        </div>

        <PurchaseSummary
          subtotal={
            subtotal
          }
          discount={
            discount
          }
          tax={tax}
        />

      </div>

      <div className="flex justify-stretch lg:justify-end">

        <button
          type="submit"
          disabled={
            loading
          }
          className="w-full rounded-xl bg-teal-600 px-8 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 lg:w-auto"
        >

          {loading
            ? "Menyimpan..."
            : "Simpan Purchase"}

        </button>

      </div>

    </form>

  );

}