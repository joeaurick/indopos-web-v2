"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { toast } from "sonner";

import { AppButton } from "@/components/ui";
import { supabase } from "@/lib/supabase/client";
import { bootstrapUser } from "../actions/bootstrap-user";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

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

      toast.success(
        "Login berhasil"
      );

      router.replace("/dashboard");
    } catch (e: any) {
      console.log(e);
      alert(
        JSON.stringify(
          e,
          null,
          2
        )
      );
    }
  }

  return (
    <section
      className="
  relative
  overflow-hidden

  flex
  min-h-screen
  items-center
  justify-center

  px-5
  py-8

  sm:px-6

  lg:px-12
"
    >

      {/* Background Blur */}

      <div
  className="
    absolute
    -left-44
    -top-44
    h-[420px]
    w-[420px]
    rounded-full

    bg-[#343C67]/15

    blur-[150px]
  "
/>

      <div
  className="
    absolute
    -bottom-52
    -right-44
    h-[500px]
    w-[500px]
    rounded-full

    bg-[#343C67]/10

    blur-[190px]
  "
/>

      <div className="relative w-full max-w-md">

        {/* LOGO */}

<div
  className="
    mb-8

    flex
    flex-col
    items-center
    justify-center

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

  <h1
  className="
    mt-6

    text-[32px]
      font-bold

      tracking-tight

      text-[#343C67]
    "
  >
    Selamat Datang
  </h1>

  <p
    className="
      mt-3

      text-[15px]

      text-slate-500
    "
  >
    Masuk ke Dashboard IndoPOS
  </p>

</div>

        {/* Glass Card */}

        <div
          className="
  rounded-[30px]

  border
  border-slate-200

  bg-white

  p-6
sm:p-8

  shadow-[0_12px_30px_rgba(15,23,42,.08)]
"
        >

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >
            {/* EMAIL */}

            <div>

              <label
  className="
    mb-2
    block

    text-[12px]
    font-semibold
    uppercase
    tracking-[0.12em]

    text-slate-500
  "
>
                Email
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
                  px-5
                  transition-all
                  duration-300
                  focus-within:border-[#343C67]
                  focus-within:ring-4
                  focus-within:ring-[#343C67]/10
                "
              >

                <Mail
                  size={18}
                  className="text-slate-400 transition group-focus-within:text-[#343C67]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Masukkan email"
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
                  focus-within:border-teal-500
                  focus-within:ring-4
                  focus-within:ring-teal-100
                "
              >

                <LockKeyhole
                  size={18}
                  className="text-slate-400 transition group-focus-within:text-[#343C67]"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Masukkan password"
                  className="
                    h-full
                    flex-1
                    bg-transparent
                    text-sm
                    outline-none
                    placeholder:text-slate-400
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
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
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* SECURITY */}

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
bg-slate-50
                px-3
py-2.5
              "
            >

              <div
                className="
                  flex
                  h-9
w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#343C67]
                  text-white
                "
              >
                <ShieldCheck size={18} />
              </div>

              <div>

                <h4 className="text-[13px] font-semibold text-slate-700">
                  Secure Authentication
                </h4>

                <p className="text-[11px] text-slate-500">
                  Login diamankan dengan Supabase Auth.
                </p>

              </div>

            </div>

            {/* LOGIN */}

            <AppButton
              type="submit"
              loading={loading}
              className="
  group

  h-12
  w-full

  rounded-2xl

  bg-[#343C67]

  text-sm
  font-semibold
  text-white

  shadow-[0_10px_30px_rgba(52,60,103,.30)]

  transition-all
  duration-200

  hover:bg-[#2C345A]
  hover:shadow-[0_16px_35px_rgba(52,60,103,.35)]

  active:scale-[.98]
"
            >

              <span className="flex items-center justify-center gap-2">

                Login ke Dashboard

                <ArrowRight
                  size={16}
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
                Belum punya akun?
              </p>

              <Link
                href="/register"
                className="
                  mt-2
                  inline-flex
                  items-center
                  gap-2
                  font-semibold
                  text-[#343C67]
                  transition
                  hover:text-[#2C345A]
                "
              >
                Daftar Gratis

                

              </Link>

            </div>

{/* FOOTER */}

<div className="mt-6 text-center">

  <p className="text-[11px] text-slate-400">
    © {new Date().getFullYear()} IndoPOS
  </p>

  <p className="mt-1 text-xs text-slate-400">
    Smart Business Platform
  </p>

</div>
          </form>

        </div>

      </div>

    </section>
  );
}