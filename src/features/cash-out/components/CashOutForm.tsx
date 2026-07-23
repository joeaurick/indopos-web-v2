"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Upload,
  FileText,
} from "lucide-react";

import { notify } from "@/lib/notify";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FormGroup } from "@/components/ui/FormGroup";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

import {
  Expense,
} from "../types";

import { useCashOutStore } from "../store/cash-out.store";

type Props = {
  businessId: string;

  open: boolean;

  mode: "create" | "edit";

  expense?: Expense | null;

  onClose: () => void;

  onSuccess?: () => void;
};

export function CashOutForm({
  businessId,
  open,
  mode,
  expense,
  onClose,
  onSuccess,
}: Props) {
  const loading =
    useCashOutStore(
      (state) => state.loading
    );

  const categories =
    useCashOutStore(
      (state) =>
        state.data.categories
    );

  const createExpense =
    useCashOutStore(
      (state) =>
        state.createExpense
    );

  const updateExpense =
    useCashOutStore(
      (state) =>
        state.updateExpense
    );

  const uploadReceipt =
    useCashOutStore(
      (state) =>
        state.uploadReceipt
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
    expenseDate,
    setExpenseDate,
  ] = useState("");

  const [
    receiptNumber,
    setReceiptNumber,
  ] = useState("");

  const [
    attachment,
    setAttachment,
  ] = useState<File | null>(
    null
  );

  const [
    attachmentUrl,
    setAttachmentUrl,
  ] = useState("");

  useEffect(() => {
    if (!open) return;

    if (
      mode === "edit" &&
      expense
    ) {
      setTitle(
        expense.title
      );

      setCategoryId(
        expense.category_id ??
          ""
      );

      setDescription(
        expense.description ??
          ""
      );

      setAmount(
        expense.amount.toString()
      );

      setPaymentMethod(
        expense.payment_method
      );

      setExpenseDate(
        expense.expense_date
      );

      setReceiptNumber(
        expense.receipt_number ??
          ""
      );

      setAttachmentUrl(
        expense.attachment_url ??
          ""
      );

      setAttachment(null);
    } else {
      setTitle("");

      setCategoryId("");

      setDescription("");

      setAmount("");

      setPaymentMethod(
        "Cash"
      );

      setExpenseDate(
        new Date()
          .toISOString()
          .slice(0, 10)
      );

      setReceiptNumber("");

      setAttachment(null);

      setAttachmentUrl("");
    }
  }, [
    open,
    mode,
    expense,
  ]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !title.trim() ||
      !amount ||
      !expenseDate
    ) {
      notify.warning(
        "Judul, nominal dan tanggal wajib diisi."
      );

      return;
    }

    const toastId =
      notify.loading(
        mode === "create"
          ? "Menyimpan pengeluaran..."
          : "Memperbarui pengeluaran..."
      );

    try {
      let fileUrl =
        attachmentUrl;

      if (attachment) {
        fileUrl =
          await uploadReceipt(
            attachment
          );
      }

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

        expense_date:
          expenseDate,

        receipt_number:
          receiptNumber.trim(),

        attachment_url:
          fileUrl || null,
      };

      if (
        mode === "create"
      ) {
        await createExpense(
  businessId,
  payload
);

notify.dismiss(
  toastId
);

notify.success(
  "Pengeluaran berhasil ditambahkan."
);
      } else {
        if (!expense) {
          throw new Error(
            "Data pengeluaran tidak ditemukan."
          );
        }

        await updateExpense(
  businessId,
  expense.id,
  payload
);

notify.dismiss(
  toastId
);

notify.success(
  "Pengeluaran berhasil diperbarui."
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
          ? "Tambah Pengeluaran"
          : "Edit Pengeluaran"
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
          label="Judul Pengeluaran"
          required
        >
          <Input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Contoh : Bayar Listrik"
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
              value={expenseDate}
              onChange={(e) =>
                setExpenseDate(
                  e.target.value
                )
              }
            />
          </FormGroup>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <FormGroup label="Metode Pembayaran">

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

          <FormGroup label="No. Receipt">

            <Input
              value={receiptNumber}
              onChange={(e) =>
                setReceiptNumber(
                  e.target.value
                )
              }
            />

          </FormGroup>

        </div>

        <FormGroup label="Upload Bukti">

          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              border-2
              border-dashed
              border-slate-300
              p-4
              transition
              hover:border-teal-500
            "
          >

            <Upload
              size={20}
            />

            <span className="text-sm text-slate-600">
              Pilih file JPG,
              PNG atau PDF
            </span>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (!file)
                  return;

                setAttachment(
                  file
                );
              }}
            />

          </label>

          {attachment && (

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-100 p-3">

              <FileText
                size={18}
              />

              <span className="text-sm">
                {
                  attachment.name
                }
              </span>

            </div>

          )}

          {!attachment &&
            attachmentUrl && (

              <a
                href={
                  attachmentUrl
                }
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
              >
                <FileText
                  size={16}
                />
                Lihat Bukti
              </a>

            )}

        </FormGroup>

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