"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { notify } from "@/lib/notify";

import { Customer } from "../types";
import { useCustomerStore } from "../store/customer.store";

type Props = {
  businessId: string;

  mode: "create" | "edit";

  customer?: Customer | null;

  onSuccess?: () => void;
};

export function CustomerForm({
  businessId,
  mode,
  customer,
  onSuccess,
}: Props) {
  const loading = useCustomerStore(
    (state) => state.loading
  );

  const createCustomer =
    useCustomerStore(
      (state) => state.createCustomer
    );

  const updateCustomer =
    useCustomerStore(
      (state) => state.updateCustomer
    );

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    if (mode === "edit" && customer) {
      setName(customer.name);
      setPhone(customer.phone);
      setEmail(customer.email);
      setAddress(customer.address);
      return;
    }

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  }, [mode, customer]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name.trim()) {
      notify.warning(
        "Nama customer wajib diisi."
      );
      return;
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
    };

    const loadingToast =
      notify.loading(
        mode === "create"
          ? "Menyimpan customer..."
          : "Memperbarui customer..."
      );

    try {
      if (mode === "create") {
        await createCustomer(
  businessId,
  payload
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Customer berhasil ditambahkan."
        );

        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
      } else {
        if (!customer) {
          throw new Error(
            "Customer tidak ditemukan."
          );
        }

        await updateCustomer(
  businessId,
  customer.id,
  payload
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Customer berhasil diperbarui."
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
          Nama Customer
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
              setPhone(e.target.value)
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
              setEmail(e.target.value)
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
            setAddress(e.target.value)
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
            ? "Simpan Customer"
            : "Update Customer"}
        </button>

      </div>

    </form>
  );
}