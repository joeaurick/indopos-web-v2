"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { notify } from "@/lib/notify";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import { Customer } from "../types";
import { useCustomerStore } from "../store/customer.store";

import { CustomerToolbar } from "../components/CustomerToolbar";
import { CustomerTable } from "../components/CustomerTable";
import { CustomerDialog } from "../components/CustomerDialog";
import { CustomerForm } from "../components/CustomerForm";
import { useBusinessId } from "@/hooks";


export function CustomersPage() {
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
    selectedCustomer,
    setSelectedCustomer,
  ] = useState<Customer | null>(
    null
  );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const customers =
    useCustomerStore(
      (state) => state.customers
    );

  const loading =
    useCustomerStore(
      (state) => state.loading
    );

    const businessId = useBusinessId();

  const fetchCustomers =
    useCustomerStore(
      (state) => state.fetchCustomers
    );

  const deleteCustomer =
    useCustomerStore(
      (state) => state.deleteCustomer
    );

  useEffect(() => {
  if (!businessId) return;

  fetchCustomers(businessId);
}, [businessId, fetchCustomers]);

  const filteredCustomers =
    useMemo(() => {
      const keyword =
        search.trim().toLowerCase();

      return customers.filter(
        (customer) =>
          keyword === "" ||
          customer.name
            .toLowerCase()
            .includes(keyword) ||
          customer.phone
            .toLowerCase()
            .includes(keyword) ||
          customer.email
            .toLowerCase()
            .includes(keyword)
      );
    }, [customers, search]);

  function handleEdit(
    customer: Customer
  ) {
    setSelectedCustomer(
      customer
    );

    setOpenEditDialog(true);
  }

  function handleDelete(
    customer: Customer
  ) {
    setSelectedCustomer(
      customer
    );

    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!selectedCustomer)
      return;

    setDeleting(true);

    const loadingToast =
      notify.loading(
        "Menghapus customer..."
      );

    try {
      if (!businessId) {
  throw new Error("Business tidak ditemukan.");
}

await deleteCustomer(
  businessId,
  selectedCustomer.id
);

      notify.dismiss(
        loadingToast
      );

      notify.success(
        "Customer berhasil dihapus."
      );

      setOpenDeleteDialog(false);

      setSelectedCustomer(
        null
      );
    } catch (error: any) {
      console.error(error);

      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Gagal menghapus customer."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="space-y-6">

        <CustomerToolbar
          search={search}
          onSearch={setSearch}
          onAdd={() =>
            setOpenCreateDialog(true)
          }
        />

        <CustomerTable
          customers={
            filteredCustomers
          }
          loading={loading}
          onEdit={handleEdit}
          onDelete={
            handleDelete
          }
        />

      </div>

      <CustomerDialog
        open={openCreateDialog}
        title="Tambah Customer"
        onClose={() =>
          setOpenCreateDialog(
            false
          )
        }
      >
        <CustomerForm
  businessId={businessId!}
  mode="create"
  onSuccess={() =>
    setOpenCreateDialog(false)
  }
/>
      </CustomerDialog>

      <CustomerDialog
        open={openEditDialog}
        title="Edit Customer"
        onClose={() => {
          setOpenEditDialog(
            false
          );

          setSelectedCustomer(
            null
          );
        }}
      >
        <CustomerForm
  businessId={businessId!}
  mode="edit"
  customer={selectedCustomer}
  onSuccess={() => {
    setOpenEditDialog(false);
    setSelectedCustomer(null);
  }}
/>
      </CustomerDialog>

      <ConfirmDialog
        open={
          openDeleteDialog
        }
        title="Hapus Customer"
        description={`Yakin ingin menghapus "${selectedCustomer?.name}" ?`}
        loading={deleting}
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() => {
          setOpenDeleteDialog(
            false
          );

          setSelectedCustomer(
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