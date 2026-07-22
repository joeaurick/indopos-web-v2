"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { notify } from "@/lib/notify";

import { Supplier } from "../types";
import { useSupplierStore } from "../store/supplier.store";

type Props = {
  businessId: string;

  mode: "create" | "edit";

  supplier?: Supplier | null;

  onSuccess?: () => void;
};

export function SupplierForm({
  businessId,
  mode,
  supplier,
  onSuccess,
}: Props) {
  const loading = useSupplierStore(
    (state) => state.loading
  );

  const createSupplier =
    useSupplierStore(
      (state) => state.createSupplier
    );

  const updateSupplier =
    useSupplierStore(
      (state) => state.updateSupplier
    );

  const [name, setName] =
    useState("");

  const [
    contactPerson,
    setContactPerson,
  ] = useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    if (mode === "edit" && supplier) {
      setName(supplier.name);
      setContactPerson(
        supplier.contact_person
      );
      setPhone(supplier.phone);
      setEmail(supplier.email);
      setAddress(supplier.address);
      return;
    }

    setName("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setAddress("");
  }, [mode, supplier]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !name.trim() ||
      !contactPerson.trim() ||
      !phone.trim()
    ) {
      notify.warning(
        "Nama, Contact Person dan Phone wajib diisi."
      );
      return;
    }

    const payload = {
      name: name.trim(),
      contact_person:
        contactPerson.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
    };

    const loadingToast =
      notify.loading(
        mode === "create"
          ? "Menyimpan supplier..."
          : "Memperbarui supplier..."
      );

    try {
      if (mode === "create") {
        await createSupplier(
  businessId,
  payload
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Supplier berhasil ditambahkan."
        );

        setName("");
        setContactPerson("");
        setPhone("");
        setEmail("");
        setAddress("");
      } else {
        if (!supplier) {
          throw new Error(
            "Supplier tidak ditemukan."
          );
        }

        await updateSupplier(
  businessId,
  supplier.id,
  payload
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Supplier berhasil diperbarui."
        );
      }

      onSuccess?.();
    } catch (error: any) {
      console.error(error);

      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Terjadi kesalahan."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nama Supplier
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Contact Person
        </label>

        <input
          value={contactPerson}
          onChange={(e) =>
            setContactPerson(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Address
        </label>

        <textarea
          rows={4}
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {loading
            ? mode === "create"
              ? "Menyimpan..."
              : "Memperbarui..."
            : mode === "create"
            ? "Simpan Supplier"
            : "Update Supplier"}
        </button>
      </div>
    </form>
  );
}