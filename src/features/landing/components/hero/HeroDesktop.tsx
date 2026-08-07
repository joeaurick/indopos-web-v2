"use client";

import Link from "next/link";
import {
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  ArrowRight,
  Play,
  ShieldCheck,
} from "lucide-react";

import { HeroStats } from "./HeroStats";

export function HeroDesktop() {
  return (
    <div
      className="
  hidden

  lg:grid

  relative

  mx-auto
  max-w-7xl

  grid-cols-2

  items-center

  gap-14 xl:gap-20

  px-5 sm:px-6 lg:px-8

  pt-32
  pb-44

  lg:px-8
"
    >
      {/* LEFT */}

      <div className="max-w-xl">

        {/* BADGE */}

        <div
          className="
            inline-flex
            items-center
            gap-2

            rounded-full

            border
            border-white/15

            bg-white/10

            px-5
            py-2.5

            text-sm

            backdrop-blur-xl
          "
        >
          <ShieldCheck size={16} />

          Smart Business Platform
        </div>

        {/* TITLE */}

        <h1
          className="
            mt-12

            text-5xl xl:text-7xl

            font-black

            leading-[1.05]

            tracking-tight
          "
        >
          Kelola Bisnis

          <br />

          <span className="text-cyan-300">
            Lebih Cepat.
          </span>

          <br />

          Lebih Cerdas.
        </h1>

        {/* DESCRIPTION */}

        <p
          className="
            mt-10

            text-lg xl:text-xl

leading-8 xl:leading-9

            text-indigo-100
          "
        >
          IndoPOS membantu Anda mengelola
          kasir, inventory, pelanggan,
          pembukuan, laporan bisnis hingga
          multi outlet dalam satu platform
          cloud modern.
        </p>

        <HeroStats />

        {/* CTA */}

        <div
          className="
            mt-14

            flex
            items-center

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

              px-8
              py-4

              font-semibold

              text-[#343C67]

              shadow-xl

              transition-all

              hover:-translate-y-1
              hover:shadow-2xl
            "
          >
            Mulai Gratis

            <ArrowRight size={18} />
          </Link>

          <Link
            href="#demo"
            className="
              inline-flex
              items-center
              gap-3

              rounded-2xl

              border
              border-white/20

              bg-white/10

              px-8
              py-4

              font-semibold

              text-white

              backdrop-blur-xl

              transition-all

              hover:bg-white/20
            "
          >
            <Play size={18} />

            Lihat Demo
          </Link>

        </div>

      </div>

      {/* RIGHT */}

<div
  className="
    relative

    mx-auto

    w-full
    max-w-[620px]

    h-[640px] xl:h-[720px]
  "
>

  {/* DASHBOARD */}

  <div
    className="
  absolute

  right-0
  top-0

  w-full
max-w-[560px] xl:max-w-[620px]

  rounded-[28px]

  bg-[#1E1E1E]

  p-3

  shadow-[0_40px_90px_rgba(0,0,0,.35)]
"
  >

    <div
      className="
        flex
        h-7
        items-center
        justify-center
      "
    >

      <div
        className="
          h-2
          w-2

          rounded-full

          bg-slate-600
        "
      />

    </div>

    <img
      src="/landing/dashboard.png"
      alt="Dashboard"
      className="
        w-full

        rounded-2xl
      "
    />

  </div>

 {/* REVENUE */}

<div
  className="
    absolute

    left-8
    top-16

    rounded-3xl

    bg-white

    p-6

    shadow-[0_25px_60px_rgba(0,0,0,.18)]

    transition-all
    duration-500

    hover:-translate-y-2
  "
>

  <div className="flex items-center gap-4">

    <div
      className="
        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-2xl

        bg-emerald-100
      "
    >

      <TrendingUp
        size={26}
        className="text-emerald-600"
      />

    </div>

    <div>

      <p
        className="
          text-xs

          uppercase

          tracking-widest

          text-slate-400
        "
      >
        Revenue
      </p>

      <h3
        className="
          mt-1

          text-3xl

          font-black

          text-slate-900
        "
      >
        Rp18.5M
      </h3>

    </div>

  </div>

</div>

{/* ORDER */}

<div
  className="
    absolute

    right-0
    bottom-24

    rounded-3xl

    bg-white

    p-6

    shadow-[0_25px_60px_rgba(0,0,0,.18)]

    transition-all
    duration-500

    hover:-translate-y-2
  "
>

  <div className="flex items-center gap-4">

    <div
      className="
        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-2xl

        bg-sky-100
      "
    >

      <Wallet
        size={26}
        className="text-sky-600"
      />

    </div>

    <div>

      <p
        className="
          text-xs

          uppercase

          tracking-widest

          text-slate-400
        "
      >
        Orders
      </p>

      <h3
        className="
          mt-1

          text-3xl

          font-black

          text-slate-900
        "
      >
        2.450
      </h3>

    </div>

  </div>

</div>

{/* MOBILE POS */}

<div
  className="
    absolute

    left-0
    bottom-0

    w-[180px] xl:w-[220px]

    -rotate-6

    transition-all
    duration-500

    hover:rotate-0
    hover:scale-105
  "
>
  <div
    className="
      overflow-hidden

      rounded-[42px]

      border-[10px]
      border-black

      bg-black

      shadow-[0_35px_70px_rgba(0,0,0,.35)]
    "
  >
    {/* Dynamic Island */}

    <div
      className="
        flex
        justify-center

        py-2
      "
    >
      <div
        className="
          h-6
          w-24

          rounded-full

          bg-[#222]
        "
      />
    </div>

    <img
      src="/landing/mobile-pos.png"
      alt="Flutter POS"
      className="w-full"
    />

  </div>

</div>

</div>

    </div>
  );
}