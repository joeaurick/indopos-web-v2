"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Save,
  X,
} from "lucide-react";

import { notify } from "@/lib/notify";

import { Supplier } from "../types";
import { useSupplierStore } from "../store/supplier.store";

type Props = {
  businessId: string;
  mode: "create" | "edit";
  supplier?: Supplier | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const inputClass = `
h-12
w-full
rounded-xl
border
border-slate-200
bg-white
px-4

text-sm
text-slate-700

outline-none

transition-all
duration-200

placeholder:text-slate-400

focus:border-emerald-500
focus:ring-4
focus:ring-emerald-100
`;

export function SupplierForm({
  businessId,
  mode,
  supplier,
  onSuccess,
  onCancel,
}: Props) {
  const loading = useSupplierStore(
    (state) => state.loading
  );

  const createSupplier = useSupplierStore(
    (state) => state.createSupplier
  );

  const updateSupplier = useSupplierStore(
    (state) => state.updateSupplier
  );

  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] =
    useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

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
        "Nama Supplier, Contact Person dan Phone wajib diisi."
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
      className="space-y-6"
    >
      {/* Header */}

      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-500
            to-teal-600
            text-white
            shadow-lg
          "
        >
          <Building2 size={24} />
        </div>

        <div>

          <h2 className="text-lg font-bold text-slate-900">
            {mode === "create"
              ? "Tambah Supplier"
              : "Edit Supplier"}
          </h2>

          <p className="text-sm text-slate-500">
            Lengkapi informasi supplier di bawah ini.
          </p>

        </div>

      </div>

      {/* Informasi Supplier */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">

            <Building2 size={18} />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Informasi Supplier
            </h3>

            <p className="text-sm text-slate-500">
              Data utama supplier.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nama Supplier
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className={inputClass}
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact Person
            </label>

            <input
              value={contactPerson}
              onChange={(e) =>
                setContactPerson(
                  e.target.value
                )
              }
              className={inputClass}
            />

          </div>

        </div>

      </div>

      {/* Kontak */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-2 text-blue-600">

            <Phone size={18} />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Informasi Kontak
            </h3>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className={inputClass}
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
              className={inputClass}
            />

          </div>

        </div>

      </div>

      {/* Alamat */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-orange-100 p-2 text-orange-600">

            <MapPin size={18} />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Alamat
            </h3>

          </div>

        </div>

        <textarea
          rows={4}
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

      {/* Footer */}

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">

        <button
  type="button"
  onClick={onCancel}
  className="
    inline-flex
    items-center
    gap-2

    rounded-xl

    border
    border-slate-300

    px-5
    py-3

    font-medium

    text-slate-600

    transition

    hover:bg-slate-100
  "
>
          <X size={18} />
          Batal
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            bg-gradient-to-r
            from-emerald-600
            to-teal-600

            px-6
            py-3

            font-semibold
            text-white

            shadow-lg
            shadow-emerald-200

            transition

            hover:-translate-y-0.5
            hover:shadow-xl

            disabled:opacity-50
          "
        >
          <Save size={18} />

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