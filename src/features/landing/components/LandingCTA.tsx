"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Monitor,
  Smartphone,
} from "lucide-react";

export function LandingCTA() {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div
          className="
            relative
            overflow-hidden

            rounded-[40px]

            bg-gradient-to-br
            from-[#343C67]
            via-[#40497A]
            to-[#242B4A]

            px-8
            py-16

            text-white

            lg:px-16
            lg:py-20
          "
        >

          {/* Glow */}

          <div
            className="
              absolute
              -left-24
              -top-24

              h-72
              w-72

              rounded-full

              bg-cyan-400/10

              blur-[120px]
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -right-24

              h-80
              w-80

              rounded-full

              bg-indigo-400/10

              blur-[150px]
            "
          />

          <div
            className="
              relative

              grid
              gap-16

              lg:grid-cols-2
              lg:items-center
            "
          >

            {/* LEFT */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-white/10

                  bg-white/10

                  px-4
                  py-2

                  text-sm

                  backdrop-blur
                "
              >

                <ShieldCheck size={16} />

                Mulai Gratis Sekarang

              </div>

              <h2
                className="
                  mt-8

                  text-4xl

                  font-black

                  leading-tight

                  lg:text-6xl
                "
              >
                Saatnya
                <br />

                Upgrade
                <br />

                Bisnis Anda.
              </h2>

              <p
                className="
                  mt-8

                  max-w-xl

                  text-lg

                  leading-8

                  text-indigo-100
                "
              >
                Gunakan Dashboard Admin dan
                Flutter POS dalam satu platform
                untuk mengelola bisnis lebih
                cepat, lebih mudah dan lebih
                profesional.
              </p>

              <div
                className="
                  mt-10

                  flex
                  flex-wrap

                  gap-4
                "
              >

                <Link
                  href="/register"
                  className="
                    inline-flex
                    items-center
                    gap-3

                    rounded-2xl

                    bg-white

                    px-7
                    py-4

                    font-semibold

                    text-[#343C67]

                    transition

                    hover:scale-[1.02]
                  "
                >

                  Mulai Gratis

                  <ArrowRight size={18} />

                </Link>

                <Link
                  href="/login"
                  className="
                    rounded-2xl

                    border
                    border-white/15

                    bg-white/10

                    px-7
                    py-4

                    font-semibold

                    backdrop-blur

                    transition

                    hover:bg-white/15
                  "
                >
                  Login
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative hidden h-[340px] lg:block">

              {/* Dashboard */}

              <div
                className="
                  absolute

                  right-0
                  top-0

                  flex
                  items-center
                  gap-4

                  rounded-3xl

                  bg-white

                  p-5

                  text-slate-900

                  shadow-2xl
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center

                    rounded-2xl

                    bg-[#EEF1FF]
                  "
                >

                  <Monitor
                    size={26}
                    className="text-[#343C67]"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Dashboard
                  </p>

                  <h3 className="font-bold">
                    Business Management
                  </h3>

                </div>

              </div>

              {/* Mobile */}

              <div
                className="
                  absolute

                  left-8
                  top-28

                  flex
                  items-center
                  gap-4

                  rounded-3xl

                  bg-white

                  p-5

                  text-slate-900

                  shadow-2xl
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center

                    rounded-2xl

                    bg-emerald-50
                  "
                >

                  <Smartphone
                    size={26}
                    className="text-emerald-600"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Flutter
                  </p>

                  <h3 className="font-bold">
                    POS Mobile
                  </h3>

                </div>

              </div>

              {/* Image */}

              <div
                className="
                  absolute

                  bottom-0
                  right-8

                  w-[320px]

                  rounded-3xl

                  border
                  border-white/10

                  bg-white

                  p-3

                  shadow-2xl
                "
              >

                <img
                  src="/landing/dashboard.png"
                  alt="Dashboard"
                  className="rounded-2xl"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}