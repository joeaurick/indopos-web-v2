"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { notify } from "@/lib/notify";

import { PurchaseOrder } from "../types";
import { usePurchaseStore } from "../store/purchase.store";

import { PurchaseToolbar } from "../components/PurchaseToolbar";
import { PurchaseTable } from "../components/PurchaseTable";
import { PurchaseDialog } from "../components/PurchaseDialog";
import { PurchaseForm } from "../components/PurchaseForm";

type Props = {
  businessId: string;
};

export function PurchasesPage({
  businessId,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [
    openDialog,
    setOpenDialog,
  ] = useState(false);

  const purchases =
    usePurchaseStore(
      (state) => state.purchases
    );

  const loading =
    usePurchaseStore(
      (state) => state.loading
    );

  const fetchPurchases =
    usePurchaseStore(
      (state) => state.fetchPurchases
    );

  const receivePurchase =
    usePurchaseStore(
      (state) =>
        state.receivePurchase
    );

  const deletePurchase =
    usePurchaseStore(
      (state) =>
        state.deletePurchase
    );

  useEffect(() => {
    fetchPurchases(
      businessId
    );
  }, [
    businessId,
    fetchPurchases,
  ]);

  const filtered =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      return purchases.filter(
        (purchase) =>
          purchase.invoice_number
            .toLowerCase()
            .includes(keyword) ||
          purchase.supplier_name
            .toLowerCase()
            .includes(keyword)
      );
    }, [
      purchases,
      search,
    ]);

  async function handleReceive(
    purchase: PurchaseOrder
  ) {
    const loadingToast =
      notify.loading(
        "Menerima barang..."
      );

    try {
      await receivePurchase(
        businessId,
        purchase.id
      );

      notify.dismiss(
        loadingToast
      );

      notify.success(
        "Barang berhasil diterima."
      );
    } catch (error: any) {
      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Gagal menerima barang."
      );
    }
  }

  async function handleDelete(
    purchase: PurchaseOrder
  ) {
    const loadingToast =
      notify.loading(
        "Menghapus purchase..."
      );

    try {
      await deletePurchase(
        businessId,
        purchase.id
      );

      notify.dismiss(
        loadingToast
      );

      notify.success(
        "Purchase berhasil dihapus."
      );
    } catch (error: any) {
      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Gagal menghapus purchase."
      );
    }
  }

  function handleEdit(
    purchase: PurchaseOrder
  ) {
    notify.info(
      "Fitur ini masih dalam tahap pengembangan Mr. Aurick Joe"
    );

    console.log(
      purchase
    );
  }

  return (
    <>
      <div className="space-y-6">

        <PurchaseToolbar
          search={search}
          onSearch={setSearch}
          onAdd={() =>
            setOpenDialog(true)
          }
        />

        <PurchaseTable
          purchases={filtered}
          loading={loading}
          onEdit={handleEdit}
          onDelete={
            handleDelete
          }
          onReceive={
            handleReceive
          }
        />

      </div>

      <PurchaseDialog
        open={openDialog}
        title="Purchase Baru"
        onClose={() =>
          setOpenDialog(false)
        }
      >
        <PurchaseForm
          businessId={businessId}
          onSuccess={() =>
            setOpenDialog(false)
          }
        />
      </PurchaseDialog>
    </>
  );
}