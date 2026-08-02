"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  User,
  Store,
  Phone,
  Building2,
  ArrowRight,
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

        <div
  className="
    mb-8

    flex
    flex-col
    items-center

    text-center
  "
>

  <div
    className="
      flex
      h-20
      w-20
      items-center
      justify-center

      rounded-2xl

      bg-[#343C67]

      shadow-[0_20px_40px_rgba(52,60,103,.25)]
    "
  >

    <img
      src="/favicon.png"
      alt="IndoPOS"
      className="h-12 w-12 object-contain"
    />

  </div>

  <h2
    className="
      mt-6

      text-[30px]
      font-bold

      text-[#343C67]
    "
  >
    Daftar Gratis
  </h2>

  <p
    className="
      mt-2

      text-[15px]

      text-slate-500
    "
  >
    Buat akun IndoPOS Trial 14 Hari
  </p>

</div>

        <form
  onSubmit={handleRegister}
  className="space-y-5"
>

          {/* ======================= */}
{/* NAMA PEMILIK */}
{/* ======================= */}

<div>

  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Nama Pemilik
  </label>

  <div
    className="
      group
      flex
      h-12
      items-center
      gap-3
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-4
      transition-all
      duration-300
      focus-within:border-[#343C67]
      focus-within:ring-4
      focus-within:ring-[#343C67]/10
    "
  >

    <User
      size={18}
      className="
        text-slate-400
        transition
        group-focus-within:text-[#343C67]
      "
    />

    <input
      type="text"
      value={ownerName}
      onChange={(e) =>
        setOwnerName(e.target.value)
      }
      placeholder="Nama lengkap pemilik bisnis"
      className="
        h-full
        flex-1
        bg-transparent
        text-[15px]
        outline-none
        placeholder:text-slate-400
      "
    />

  </div>

</div>

{/* ======================= */}
{/* NAMA BISNIS */}
{/* ======================= */}

<div>

  <label className="mb-2 block text-[15px] font-semibold text-slate-700">
    Nama Bisnis
  </label>

  <div
    className="
      group
      flex
      h-14
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      transition-all
      duration-300
      focus-within:border-[#343C67]
      focus-within:ring-4
      focus-within:ring-[#343C67]/10
    "
  >

    <Store
      size={20}
      className="
        text-slate-400
        transition
        group-focus-within:text-[#343C67]
      "
    />

    <input
      type="text"
      value={businessName}
      onChange={(e) =>
        setBusinessName(e.target.value)
      }
      placeholder="Contoh : Coffee ABC"
      className="
        h-full
        flex-1
        bg-transparent
        text-[15px]
        outline-none
        placeholder:text-slate-400
      "
    />

  </div>

</div>

{/* ======================= */}
{/* JENIS BISNIS */}
{/* ======================= */}

<div>

  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Jenis Bisnis
  </label>

  <div
    className="
      group
      flex
      h-14
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      transition-all
      duration-300
      focus-within:border-[#343C67]
      focus-within:ring-4
      focus-within:ring-[#343C67]/10
    "
  >

    <Building2
      size={20}
      className="
        text-slate-400
        transition
        group-focus-within:text-[#343C67]
      "
    />

    <select
      value={businessType}
      onChange={(e) =>
        setBusinessType(e.target.value)
      }
      className="
        h-full
        flex-1
        cursor-pointer
        bg-transparent
        outline-none
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

</div>

{/* ======================= */}
{/* WHATSAPP */}
{/* ======================= */}

<div>

  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Nomor WhatsApp
  </label>

  <div
    className="
      group
      flex
      h-14
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      transition-all
      duration-300
      focus-within:border-[#343C67]
      focus-within:ring-4
      focus-within:ring-[#343C67]/10
    "
  >

    <Phone
      size={20}
      className="
        text-slate-400
        transition
        group-focus-within:text-[#343C67]
      "
    />

    <input
      type="tel"
      value={phone}
      onChange={(e) =>
        setPhone(e.target.value)
      }
      placeholder="08xxxxxxxxxx"
      className="
        h-full
        flex-1
        bg-transparent
        text-[15px]
        outline-none
        placeholder:text-slate-400
      "
    />

  </div>

</div>

{/* ======================= */}
{/* EMAIL */}
{/* ======================= */}

<div>

  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Email
  </label>

  <div
    className="
      group
      flex
      h-14
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      transition-all
      duration-300
      focus-within:border-[#343C67]
      focus-within:ring-4
      focus-within:ring-[#343C67]/10
    "
  >

    <Mail
      size={20}
      className="
        text-slate-400
        transition
        group-focus-within:text-[#343C67]
      "
    />

    <input
      type="email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      placeholder="Masukan Email Anda"
      className="
        h-full
        flex-1
        bg-transparent
        text-[15px]
        outline-none
        placeholder:text-slate-400
      "
    />

  </div>

</div>

          {/* PASSWORD */}

<div>

  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Password
  </label>

  <div
    className="
      group
      flex
      h-14
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      transition-all
      duration-300
      focus-within:border-[#343C67]
      focus-within:ring-4
      focus-within:ring-[#343C67]/10
    "
  >

    <LockKeyhole
      size={20}
      className="
        text-slate-400
        transition
        group-focus-within:text-[#343C67]
      "
    />

    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      placeholder="Minimal 6 karakter"
      className="
        h-full
        flex-1
        bg-transparent
        text-[15px]
        outline-none
        placeholder:text-slate-400
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
      className="
        rounded-xl
        p-2
        text-slate-400
        transition
        hover:bg-slate-100
        hover:text-[#343C67]
      "
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

  </div>

</div>

{/* KONFIRMASI PASSWORD */}

<div>

  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Konfirmasi Password
  </label>

  <div
    className="
      group
      flex
      h-14
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      transition-all
      duration-300
      focus-within:border-[#343C67]
      focus-within:ring-4
      focus-within:ring-[#343C67]/10
    "
  >

    <LockKeyhole
      size={20}
      className="
        text-slate-400
        transition
        group-focus-within:text-[#343C67]
      "
    />

    <input
      type={
        showConfirmPassword
          ? "text"
          : "password"
      }
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(
          e.target.value
        )
      }
      placeholder="Ulangi password"
      className="
        h-full
        flex-1
        bg-transparent
        text-[15px]
        outline-none
        placeholder:text-slate-400
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(
          !showConfirmPassword
        )
      }
      className="
        rounded-xl
        p-2
        text-slate-400
        transition
        hover:bg-slate-100
        hover:text-[#343C67]
      "
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

  </div>

</div>

          <AppButton
  type="submit"
  loading={loading}
  className="
    group
    h-14
    w-full
    rounded-2xl

    bg-[#343C67]
    hover:bg-[#2C345A]

    text-base
    font-semibold

    shadow-lg
    shadow-teal-600/25

    transition-all
    duration-300

    hover:scale-[1.02]
    hover:shadow-2xl
    hover:shadow-teal-600/30

    active:scale-[0.99]
  "
>

  <span className="flex items-center justify-center gap-2">

    Buat Akun Gratis

    <ArrowRight
      size={18}
      className="
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
    />

  </span>

</AppButton>

          <div className="text-center">

  <p className="text-sm text-slate-500">
    Sudah memiliki akun?
  </p>

  <Link
    href="/login"
    className="
      mt-2
      inline-flex
      items-center
      gap-2

      font-semibold
      text-[#343C67]

      transition
      hover:text-teal-700
    "
  >

    Login ke Dashboard

    <ArrowRight
      size={16}
      className="
        transition-transform
        duration-300
        hover:translate-x-1
      "
    />

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

    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#343C67]/10">
      <Mail
        size={40}
        className="text-[#343C67]"
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