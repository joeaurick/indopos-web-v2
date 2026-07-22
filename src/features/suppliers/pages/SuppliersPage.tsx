"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useBusinessStore } from "@/features/settings/store/business-store";
import { notify } from "@/lib/notify";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import { Supplier } from "../types";
import { useSupplierStore } from "../store/supplier.store";

import { SupplierToolbar } from "../components/SupplierToolbar";
import { SupplierTable } from "../components/SupplierTable";
import { SupplierDialog } from "../components/SupplierDialog";
import { SupplierForm } from "../components/SupplierForm";

export function SuppliersPage() {
  const [search, setSearch] =
    useState("");

  const [
    openCreateDialog,
    setOpenCreateDialog,
  ] = useState(false);

  const [
    openEditDialog,
    setOpenEditDialog,
  ] = useState(false);

  const [
    openDeleteDialog,
    setOpenDeleteDialog,
  ] = useState(false);

  const [
    selectedSupplier,
    setSelectedSupplier,
  ] = useState<Supplier | null>(
    null
  );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const suppliers =
    useSupplierStore(
      (state) => state.suppliers
    );

  const loading =
    useSupplierStore(
      (state) => state.loading
    );

    const businessId = useBusinessStore(
  (state) => state.business?.id
);

  const fetchSuppliers =
    useSupplierStore(
      (state) => state.fetchSuppliers
    );

  const deleteSupplier =
    useSupplierStore(
      (state) => state.deleteSupplier
    );

  useEffect(() => {
  if (!businessId) return;

  fetchSuppliers(businessId);
}, [businessId, fetchSuppliers]);

  const filteredSuppliers =
    useMemo(() => {
      const keyword =
        search.trim().toLowerCase();

      return suppliers.filter(
        (supplier) =>
          keyword === "" ||
          supplier.name
            .toLowerCase()
            .includes(keyword) ||
          supplier.contact_person
            .toLowerCase()
            .includes(keyword) ||
          supplier.phone
            .toLowerCase()
            .includes(keyword) ||
          supplier.email
            .toLowerCase()
            .includes(keyword)
      );
    }, [suppliers, search]);

  function handleEdit(
    supplier: Supplier
  ) {
    setSelectedSupplier(
      supplier
    );

    setOpenEditDialog(true);
  }

  function handleDelete(
    supplier: Supplier
  ) {
    setSelectedSupplier(
      supplier
    );

    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!selectedSupplier)
      return;

    setDeleting(true);

    const loadingToast =
      notify.loading(
        "Menghapus supplier..."
      );

    try {
      if (!businessId) {
  throw new Error("Business tidak ditemukan.");
}

await deleteSupplier(
  businessId,
  selectedSupplier.id
);

      notify.dismiss(
        loadingToast
      );

      notify.success(
        "Supplier berhasil dihapus."
      );

      setOpenDeleteDialog(false);

      setSelectedSupplier(
        null
      );
    } catch (error: any) {
      console.error(error);

      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Gagal menghapus supplier."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="space-y-6">

        <SupplierToolbar
          search={search}
          onSearch={setSearch}
          onAdd={() =>
            setOpenCreateDialog(true)
          }
        />

        <SupplierTable
          suppliers={
            filteredSuppliers
          }
          loading={loading}
          onEdit={handleEdit}
          onDelete={
            handleDelete
          }
        />

      </div>

      <SupplierDialog
        open={openCreateDialog}
        title="Tambah Supplier"
        onClose={() =>
          setOpenCreateDialog(
            false
          )
        }
      >
        <SupplierForm
  businessId={businessId!}
  mode="create"
  onSuccess={() =>
    setOpenCreateDialog(false)
  }
/>
      </SupplierDialog>

      <SupplierDialog
        open={openEditDialog}
        title="Edit Supplier"
        onClose={() => {
          setOpenEditDialog(
            false
          );

          setSelectedSupplier(
            null
          );
        }}
      >
        <SupplierForm
  businessId={businessId!}
  mode="edit"
  supplier={selectedSupplier}
  onSuccess={() => {
    setOpenEditDialog(false);
    setSelectedSupplier(null);
  }}
/>
      </SupplierDialog>

      <ConfirmDialog
        open={
          openDeleteDialog
        }
        title="Hapus Supplier"
        description={`Yakin ingin menghapus "${selectedSupplier?.name}" ?`}
        loading={deleting}
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() => {
          setOpenDeleteDialog(
            false
          );

          setSelectedSupplier(
            null
          );
        }}
        onConfirm={
          confirmDelete
        }
      />
    </>
  );
}