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
  Sparkles,
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

        px-6
        py-10

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
          bg-teal-400/20
          blur-[140px]
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
          bg-cyan-400/20
          blur-[180px]
        "
      />

      <div className="relative w-full max-w-md">

        {/* Logo */}

        <div className="mb-10 text-center">

          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[30px]

              bg-gradient-to-br
              from-teal-500
              via-emerald-500
              to-cyan-500

              shadow-[0_25px_60px_rgba(13,148,136,.35)]
            "
          >

            <Sparkles
              size={38}
              className="text-white"
            />

          </div>

          <h1
            className="
              mt-7
              text-4xl
              font-extrabold
              tracking-tight
              text-slate-900
            "
          >
            Selamat Datang
          </h1>

          <p
            className="
              mt-3
              text-base
              text-slate-500
            "
          >
            Login ke Dashboard IndoPOS
          </p>

        </div>

        {/* Glass Card */}

        <div
          className="
            rounded-[34px]
            border
            border-white/40
            bg-white/85
            p-8
            shadow-[0_25px_70px_rgba(15,23,42,.10)]
            backdrop-blur-2xl
          "
        >

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >
            {/* EMAIL */}

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
                  focus-within:border-teal-500
                  focus-within:ring-4
                  focus-within:ring-teal-100
                "
              >

                <Mail
                  size={20}
                  className="text-slate-400 transition group-focus-within:text-teal-600"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="nama@email.com"
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
                  focus-within:border-teal-500
                  focus-within:ring-4
                  focus-within:ring-teal-100
                "
              >

                <LockKeyhole
                  size={20}
                  className="text-slate-400 transition group-focus-within:text-teal-600"
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
                    text-[15px]
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
                    hover:text-teal-600
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
                rounded-2xl
                border
                border-emerald-100
                bg-emerald-50
                px-4
                py-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-500
                  text-white
                "
              >
                <ShieldCheck size={18} />
              </div>

              <div>

                <h4 className="text-sm font-semibold text-emerald-700">
                  Secure Authentication
                </h4>

                <p className="text-xs text-emerald-600">
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
                h-14
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-teal-600
                via-emerald-600
                to-cyan-600
                text-base
                font-semibold
                shadow-lg
                shadow-teal-600/25
                transition-all
                hover:scale-[1.02]
                hover:shadow-xl
              "
            >

              <span className="flex items-center justify-center gap-2">

                Login ke Dashboard

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
                  text-teal-600
                  transition
                  hover:text-teal-700
                "
              >
                Daftar Gratis

                <ArrowRight size={16} />

              </Link>

            </div>

{/* FOOTER */}

<div className="mt-10 text-center">

  <p className="text-xs text-slate-400">
    © {new Date().getFullYear()} IndoPOS
  </p>

  <p className="mt-1 text-xs text-slate-400">
    Enterprise Point of Sale Platform
  </p>

</div>
          </form>

        </div>

      </div>

    </section>
  );
}