"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Eye,
  EyeOff,
  Mail,
} from "lucide-react";

import { toast } from "sonner";

import {
  AppButton,
  AppModal,
} from "@/components/ui";

import { register } from "../actions/register";

export function RegisterForm() {
  const [ownerName, setOwnerName] =
    useState("");

  const [businessName, setBusinessName] =
    useState("");

  const [businessType, setBusinessType] =
    useState("restaurant");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    successOpen,
    setSuccessOpen,
  ] = useState(false);

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !ownerName ||
      !businessName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error(
        "Semua data wajib diisi"
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      toast.error(
        "Konfirmasi password tidak sama"
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password minimal 6 karakter"
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await register({
          ownerName,
          businessName,
          businessType,
          phone,
          email,
          password,
        });

      if (!result.success) {
        toast.error(
          "Register gagal."
        );
        return;
      }

      setSuccessOpen(true);
    } catch (err: any) {
      toast.error(
        err.message ??
          "Register gagal"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleContinue() {
    window.location.href =
      `/check-email?email=${encodeURIComponent(
        email
      )}`;
  }

  function openGmail() {
    window.open(
      "https://mail.google.com",
      "_blank"
    );
  }

  return (
    <section
      className="
        flex
        items-center
        justify-center

        p-6

        lg:p-10
      "
    >
      <div className="w-full max-w-lg">

        <div className="mb-8 text-center">

          <div
            className="
              mx-auto
              mb-5

              flex
              h-16
              w-16
              items-center
              justify-center

              rounded-3xl

              bg-[var(--primary)]

              text-2xl
              font-bold
              text-white
            "
          >
            I
          </div>

          <h2 className="text-3xl font-bold">
            Daftar Gratis
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Buat akun IndoPOS Trial 14 Hari
          </p>

        </div>

        <form
  onSubmit={handleRegister}
  className="space-y-5"
>

          <Input
  label="Nama Pemilik"
  placeholder="John Doe"
  value={ownerName}
  onChange={setOwnerName}
/>

          <Input
  label="Nama Bisnis"
  placeholder="Coffee ABC"
  value={businessName}
  onChange={setBusinessName}
/>

<div>
  <label className="mb-2 block text-sm font-medium">
    Jenis Bisnis
  </label>

  <select
    value={businessType}
    onChange={(e) =>
      setBusinessType(e.target.value)
    }
    className="
      h-14
      w-full
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      outline-none
      transition
      focus:border-[var(--primary)]
      focus:ring-4
      focus:ring-teal-100
    "
  >
    {BUSINESS_TYPES.map((item) => (
      <option
        key={item.value}
        value={item.value}
      >
        {item.label}
      </option>
    ))}
  </select>
</div>

          <Input
  label="Nomor WhatsApp"
  placeholder="08123456789"
  value={phone}
  onChange={setPhone}
/>

          <Input
  label="Email"
  placeholder="email@gmail.com"
  value={email}
  onChange={setEmail}
/>

          <PasswordInput
  label="Password"
  value={password}
  onChange={setPassword}
  show={showPassword}
  toggle={() =>
    setShowPassword(!showPassword)
  }
/>

          <PasswordInput
  label="Konfirmasi Password"
  value={confirmPassword}
  onChange={setConfirmPassword}
  show={showConfirmPassword}
  toggle={() =>
    setShowConfirmPassword(
      !showConfirmPassword
    )
  }
/>

          <AppButton
  type="submit"
  loading={loading}
  className="h-14 w-full rounded-2xl"
>
            Daftar Gratis
          </AppButton>

          <div className="text-center">

            <span className="text-sm text-slate-500">
              Sudah punya akun?
            </span>

            <Link
              href="/login"
              className="
                ml-2
                font-semibold
                text-[var(--primary)]
              "
            >
              Login
            </Link>

          </div>

        </form>

      </div>

      <AppModal
  open={successOpen}
  onClose={() => setSuccessOpen(false)}
  title="Verifikasi Email"
>
  <div className="space-y-6">

    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
      <Mail
        size={40}
        className="text-emerald-600"
      />
    </div>

    <div className="text-center">

      <h3 className="text-2xl font-bold">
        Hampir Selesai 🎉
      </h3>

      <p className="mt-3 text-slate-600">
        Kami telah mengirim email verifikasi ke
      </p>

      <p className="mt-1 font-semibold text-[var(--primary)] break-all">
        {email}
      </p>

      <p className="mt-4 text-sm text-slate-500 leading-7">
        Silakan buka email tersebut lalu klik tombol
        <strong> Konfirmasi Email </strong>
        untuk mengaktifkan akun IndoPOS Anda.
      </p>

      <p className="mt-3 text-sm text-slate-500">
        Setelah email berhasil diverifikasi,
        Anda dapat login menggunakan akun tersebut.
      </p>

    </div>

    <div className="grid gap-3">

      <AppButton
        type="button"
        onClick={openGmail}
        className="h-12 w-full"
      >
        Buka Gmail
      </AppButton>

      <AppButton
        type="button"
        variant="secondary"
        onClick={handleContinue}
        className="h-12 w-full"
      >
        Lanjut
      </AppButton>

    </div>

  </div>
</AppModal>

    </section>
  );
}

const BUSINESS_TYPES = [
  {
    value: "restaurant",
    label: "🍽️ Restaurant",
  },
  {
    value: "cafe",
    label: "☕ Cafe",
  },
  {
    value: "coffee_shop",
    label: "🥤 Coffee Shop",
  },
  {
    value: "bakery",
    label: "🍞 Bakery",
  },
  {
    value: "retail",
    label: "🛒 Retail / Toko",
  },
  {
    value: "minimarket",
    label: "🏪 Minimarket",
  },
  {
    value: "salon",
    label: "💇 Salon & Barbershop",
  },
  {
    value: "beauty",
    label: "💅 Beauty",
  },
  {
    value: "pharmacy",
    label: "💊 Apotek",
  },
  {
    value: "umkm",
    label: "🏬 UMKM / Lainnya",
  },
];

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-[var(--primary)]
          focus:ring-4
          focus:ring-teal-100
        "
      />
    </div>
  );
}

function PasswordInput({
  label,
  show,
  toggle,
  value,
  onChange,
}: {
  label: string;
  show: boolean;
  toggle: () => void;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-slate-200
            px-5
            pr-14
            outline-none
            focus:border-[var(--primary)]
            focus:ring-4
            focus:ring-teal-100
          "
        />

        <button
          type="button"
          onClick={toggle}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
          "
        >
          {show ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    </div>
  );
}