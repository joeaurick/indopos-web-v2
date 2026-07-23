"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { notify } from "@/lib/notify";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FormGroup } from "@/components/ui/FormGroup";

import { CashIn } from "../types";

import { useCashInStore } from "../store/cash-in.store";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

type Props = {
  businessId: string;

  open: boolean;

  mode: "create" | "edit";

  cashIn?: CashIn | null;

  onClose: () => void;

  onSuccess?: () => void;
};

export function CashInForm({
  businessId,
  open,
  mode,
  cashIn,
  onClose,
  onSuccess,
}: Props) {
  const loading =
    useCashInStore(
      (state) => state.loading
    );

  const categories =
    useCashInStore(
      (state) => state.data.categories
    );

  const createCashIn =
    useCashInStore(
      (state) => state.createCashIn
    );

  const updateCashIn =
    useCashInStore(
      (state) => state.updateCashIn
    );

  const [title, setTitle] =
    useState("");

  const [
    categoryId,
    setCategoryId,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [amount, setAmount] =
    useState("");

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("Cash");

  const [
    cashInDate,
    setCashInDate,
  ] = useState("");

  const [
    receiptNumber,
    setReceiptNumber,
  ] = useState("");

  useEffect(() => {
    if (!open) return;

    if (
      mode === "edit" &&
      cashIn
    ) {
      setTitle(cashIn.title);

      setCategoryId(
        cashIn.category_id ??
          ""
      );

      setDescription(
        cashIn.description ??
          ""
      );

      setAmount(
        cashIn.amount.toString()
      );

      setPaymentMethod(
        cashIn.payment_method
      );

      setCashInDate(
        cashIn.cash_in_date
      );

      setReceiptNumber(
        cashIn.receipt_number ??
          ""
      );
    } else {
      setTitle("");

      setCategoryId("");

      setDescription("");

      setAmount("");

      setPaymentMethod(
        "Cash"
      );

      setCashInDate(
        new Date()
          .toISOString()
          .slice(0, 10)
      );

      setReceiptNumber("");
    }
  }, [
    open,
    mode,
    cashIn,
  ]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !title.trim() ||
      !amount ||
      !cashInDate
    ) {
      notify.warning(
        "Judul, nominal dan tanggal wajib diisi."
      );

      return;
    }

    const toastId =
      notify.loading(
        mode === "create"
          ? "Menyimpan pemasukan..."
          : "Memperbarui pemasukan..."
      );

    try {
      const payload = {
        title: title.trim(),

        category_id:
          categoryId || null,

        description:
          description.trim(),

        amount: Number(
          amount
        ),

        payment_method:
          paymentMethod,

        cash_in_date:
          cashInDate,

        receipt_number:
          receiptNumber.trim(),
      };

      if (
        mode === "create"
      ) {
        await createCashIn(
          businessId,
          payload
        );

        notify.dismiss(
          toastId
        );

        notify.success(
          "Pemasukan berhasil ditambahkan."
        );
      } else {
        if (!cashIn) {
          throw new Error(
            "Data pemasukan tidak ditemukan."
          );
        }

        await updateCashIn(
          businessId,
          cashIn.id,
          payload
        );

        notify.dismiss(
          toastId
        );

        notify.success(
          "Pemasukan berhasil diperbarui."
        );
      }

      onSuccess?.();

      onClose();
    } catch (
      error: any
    ) {
      console.error(
        error
      );

      notify.dismiss(
        toastId
      );

      notify.error(
        error?.message ??
          "Terjadi kesalahan."
      );
    }
  }

  return (
    <Modal
      open={open}
      title={
        mode === "create"
          ? "Tambah Pemasukan"
          : "Edit Pemasukan"
      }
      onClose={onClose}
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-5"
      >
        <FormGroup
          label="Judul Pemasukan"
          required
        >
          <Input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Contoh : Modal Pemilik"
          />
        </FormGroup>

        <FormGroup label="Kategori">
          <Select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
          >
            <option value="">
              Tanpa Kategori
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              )
            )}
          </Select>
        </FormGroup>

        <div className="grid grid-cols-2 gap-5">
          <FormGroup
  label="Nominal"
  required
>
  <CurrencyInput
    value={amount}
    onChange={setAmount}
    placeholder="Masukkan nominal"
    className="
      w-full
      rounded-xl
      border
      border-slate-300
      px-4
      py-3
      outline-none
      focus:border-teal-500
    "
  />
</FormGroup>

          <FormGroup
            label="Tanggal"
            required
          >
            <Input
              type="date"
              value={cashInDate}
              onChange={(e) =>
                setCashInDate(
                  e.target.value
                )
              }
            />
          </FormGroup>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <FormGroup label="Metode Penerimaan">
            <Select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            >
              <option>
                Cash
              </option>

              <option>
                Transfer
              </option>

              <option>
                QRIS
              </option>

              <option>
                Debit
              </option>

              <option>
                Kredit
              </option>

              <option>
                E-Wallet
              </option>
            </Select>
          </FormGroup>

          <FormGroup label="No. Referensi">
            <Input
              value={receiptNumber}
              onChange={(e) =>
                setReceiptNumber(
                  e.target.value
                )
              }
              placeholder="Opsional"
            />
          </FormGroup>
        </div>

        <FormGroup label="Deskripsi">
          <Textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Catatan tambahan..."
          />
        </FormGroup>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={
              onClose
            }
            className="
              bg-slate-200
              text-slate-700
              hover:bg-slate-300
            "
          >
            Batal
          </Button>

          <Button
            type="submit"
            disabled={
              loading
            }
          >
            {loading
              ? mode ===
                "create"
                ? "Menyimpan..."
                : "Memperbarui..."
              : mode ===
                "create"
              ? "Simpan"
              : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}