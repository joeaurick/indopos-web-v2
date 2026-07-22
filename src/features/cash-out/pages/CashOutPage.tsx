"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PageHeader } from "@/components/app/page-header/PageHeader";

import { notify } from "@/lib/notify";

import { Expense } from "../types";
import { useCashOutStore } from "../store/cash-out.store";

import { CashOutSummary } from "../components/CashOutSummary";
import { CashOutFilter } from "../components/CashOutFilter";
import { CashOutTable } from "../components/CashOutTable";
import { CashOutForm } from "../components/CashOutForm";

type Props = {
  businessId: string;
};

export function CashOutPage({
  businessId,
}: Props) {
  const expenses = useCashOutStore(
    (state) => state.data.expenses
  );

  const loading = useCashOutStore(
    (state) => state.loading
  );

  const deleteExpense =
    useCashOutStore(
      (state) => state.deleteExpense
    );

  const [formOpen, setFormOpen] =
    useState(false);

  const [mode, setMode] =
    useState<"create" | "edit">(
      "create"
    );

  const [
    selectedExpense,
    setSelectedExpense,
  ] = useState<Expense | null>(
    null
  );

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const [
    deleteId,
    setDeleteId,
  ] = useState("");

  function handleCreate() {
    setMode("create");

    setSelectedExpense(null);

    setFormOpen(true);
  }

  function handleEdit(
    id: string
  ) {
    const expense =
      expenses.find(
        (item) => item.id === id
      ) ?? null;

    setMode("edit");

    setSelectedExpense(expense);

    setFormOpen(true);
  }

  function handleDelete(
    id: string
  ) {
    setDeleteId(id);

    setDeleteOpen(true);
  }

  async function confirmDelete() {
    const toast =
      notify.loading(
        "Menghapus pengeluaran..."
      );

    try {
      await deleteExpense(
        businessId,
        deleteId
      );

      notify.dismiss(
        toast
      );

      notify.success(
        "Pengeluaran berhasil dihapus."
      );

      setDeleteOpen(false);

      setDeleteId("");
    } catch (error: any) {
      notify.dismiss(
        toast
      );

      notify.error(
        error?.message ??
          "Gagal menghapus pengeluaran."
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Cash Out"
        subtitle="Kelola seluruh pengeluaran usaha."
        action={
          <Button
            onClick={handleCreate}
          >
            <Plus
              size={18}
              className="mr-2"
            />
            Tambah Pengeluaran
          </Button>
        }
      />

      <CashOutSummary
        businessId={businessId}
      />

      <div className="mt-6">
        <CashOutFilter
          businessId={businessId}
        />
      </div>

      <div className="mt-6">
        <CashOutTable
          businessId={businessId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <CashOutForm
        businessId={businessId}
        open={formOpen}
        mode={mode}
        expense={selectedExpense}
        onClose={() =>
          setFormOpen(false)
        }
        onSuccess={() =>
          setFormOpen(false)
        }
      />

      <ConfirmDialog
        open={deleteOpen}
        loading={loading}
        title="Hapus Pengeluaran"
        description="Apakah Anda yakin ingin menghapus data pengeluaran ini?"
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() =>
          setDeleteOpen(false)
        }
        onConfirm={
          confirmDelete
        }
      />
    </>
  );
}