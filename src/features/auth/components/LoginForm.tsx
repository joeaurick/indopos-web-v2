"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "sonner";

import { AppButton } from "@/components/ui";
import { supabase } from "@/lib/supabase/client";
import { bootstrapUser } from "../actions/bootstrap-user";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!email || !password) {
      toast.error(
        "Email dan Password wajib diisi"
      );
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    try {
  await bootstrapUser();

  toast.success("Login berhasil");

  router.replace("/dashboard");

} catch (e: any) {
  console.log(e);

  alert(JSON.stringify(e, null, 2));
}
  }

  return (
    <section
  className="
p-6

lg:flex
lg:items-center
lg:justify-center

lg:p-10
"
>
      <div className="w-full max-w-lg">

        {/* HEADER */}

        <div className="mb-8 text-center lg:mb-10">

          <div
  className="
    mx-auto
    mb-6

    flex
    h-16
    w-16

    lg:h-20
    lg:w-20

    items-center
    justify-center

    rounded-3xl

    bg-[var(--primary)]

    text-2xl
    lg:text-3xl

    font-bold
    text-white

    shadow-xl
  "
>
  I
</div>

          <h2 className="text-3xl font-bold lg:text-4xl">
            Selamat Datang
          </h2>

          <p className="mt-3 text-sm lg:text-[15px] text-slate-500">
            Masuk ke Dashboard IndoPOS
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

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
    placeholder="Masukkan email"
    className="
      h-14
      w-full
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      text-[15px]
      outline-none
      transition-all
      focus:border-[var(--primary)]
      focus:ring-4
      focus:ring-teal-100
    "
  />
</div>

          <div>
  <label className="mb-2 block text-sm font-medium">
    Password
  </label>

  <div className="relative">

    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      placeholder="Masukkan password"
      className="
        h-14
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-5
        pr-14
        text-[15px]
        outline-none
        transition-all
        focus:border-[var(--primary)]
        focus:ring-4
        focus:ring-teal-100
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
      className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2
        text-slate-400
        hover:text-slate-700
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

          <AppButton
  type="submit"
  loading={loading}
  className="h-14 w-full rounded-2xl"
>
  Login
</AppButton>

          <div className="mt-8 text-center">

  <p className="text-sm text-slate-500">
    Belum punya akun?
  </p>

  <Link
  href="/register"
  className="
    mt-2
    inline-block
    font-semibold
    text-[var(--primary)]
    hover:underline
  "
>
  Daftar Gratis
</Link>

</div>

<div className="my-8 flex items-center">

  <div className="h-px flex-1 bg-slate-200" />

  <span className="px-4 text-xs text-slate-400">
    ATAU
  </span>

  <div className="h-px flex-1 bg-slate-200" />

</div>

<button
  type="button"
  className="
    h-14
    w-full
    rounded-2xl

    border
    border-teal-600

    font-semibold
    text-teal-700

    transition

    hover:bg-teal-50
  "
>
  Coba Trial Gratis 14 Hari
</button>

        </form>

      </div>
    </section>
  );
}