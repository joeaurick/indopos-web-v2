"use client";

import Link from "next/link";

import {
  ArrowRight,
  Play,
  ShieldCheck,
  Smartphone,
  Monitor,
  BarChart3,
  TrendingUp,
  Cloud,
  Store,
  Wallet,
} from "lucide-react";



export function LandingHero() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-gradient-to-br
        from-[#343C67]
        via-[#40497A]
        to-[#242B4A]

        text-white
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          -left-32
          top-0

          h-[450px]
          w-[450px]

          rounded-full

          bg-cyan-400/10

          blur-[140px]
        "
      />

      <div
        className="
          absolute
          right-0
          bottom-0

          h-[500px]
          w-[500px]

          rounded-full

          bg-indigo-300/10

          blur-[180px]
        "
      />

      <div
  className="
    relative

    mx-auto

    grid
    max-w-7xl

    items-center
    gap-16

    px-6

    pt-24
    pb-36

    lg:grid-cols-2
    lg:px-8
    lg:pt-32
    lg:pb-44
  "
>

        <div>

  {/* Badge */}

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
      font-medium

      backdrop-blur-xl
    "
  >
    <ShieldCheck size={16} />

    Smart Business Platform
  </div>

  {/* Heading */}

  <h1
    className="
      mt-8

      max-w-2xl

      text-4xl
      font-black
      leading-tight

      tracking-tight

      sm:text-5xl
      lg:text-7xl
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

  {/* Description */}

  <p
    className="
      mt-8

      max-w-xl

      text-lg
      leading-8

      text-indigo-100
    "
  >
    IndoPOS membantu Anda mengelola kasir,
    inventory, pelanggan, pembukuan,
    laporan bisnis hingga multi outlet
    dalam satu platform cloud yang modern.
  </p>

  {/* Social Proof */}

  <div
    className="
      mt-12

      flex
      flex-wrap
      items-center
      gap-10
    "
  >
    <div>

      <h3 className="text-3xl font-black">
        500+
      </h3>

      <p className="text-sm text-indigo-200">
        Merchant Aktif
      </p>

    </div>

    <div>

      <h3 className="text-3xl font-black">
        99.9%
      </h3>

      <p className="text-sm text-indigo-200">
        Cloud Uptime
      </p>

    </div>

    <div>

      <h3 className="text-3xl font-black">
        24/7
      </h3>

      <p className="text-sm text-indigo-200">
        Customer Support
      </p>

    </div>

  </div>

          {/* CTA */}

<div
  className="
    mt-14

    flex
    flex-wrap

    items-center

    gap-4
  "
>

  {/* PRIMARY */}

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
      duration-300

      hover:-translate-y-1
      hover:shadow-2xl
    "
  >
    Mulai Gratis

    <ArrowRight size={18} />
  </Link>

  {/* SECONDARY */}

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
      duration-300

      hover:bg-white/20
    "
  >
    <Play size={18} />

    Lihat Demo
  </Link>

</div>

{/* TRUST */}

<div
  className="
    mt-14

    flex
    flex-wrap

    items-center

    gap-5
  "
>

  <div className="flex text-yellow-400 text-lg">
    ★★★★★
  </div>

  <p
    className="
      text-sm

      text-indigo-100
    "
  >
    Dipercaya oleh merchant di berbagai sektor bisnis.
  </p>

</div>

        </div>

        {/* RIGHT */}

<div
  className="
    relative

    hidden

    h-[760px]

    lg:block
  "
>

          {/* LAPTOP */}

<div
  className="
    absolute

    right-4
top-6

    w-[720px]

    rotate-2

    transition-transform
    duration-500

    hover:rotate-0
  "
>

  {/* Screen */}

  <div
    className="
      overflow-hidden

      rounded-[22px]

      border-[10px]
      border-[#1E1E1E]

      bg-[#1E1E1E]

      shadow-[0_40px_80px_rgba(0,0,0,.35)]
    "
  >

    {/* Camera */}

    <div
      className="
        flex
        h-6
        items-center
        justify-center

        bg-[#1E1E1E]
      "
    >

      <div
        className="
          h-2
          w-2

          rounded-full

          bg-slate-700
        "
      />

    </div>

    <img
      src="/landing/dashboard.png"
      alt="Dashboard"

      className="
        w-full
      "
    />

  </div>

  {/* Bottom Laptop */}

  <div
    className="
      mx-auto

      h-3
      w-[94%]

      rounded-b-[20px]

      bg-gradient-to-b
      from-slate-300
      to-slate-400
    "
  />

</div>

          {/* PHONE */}

<div
  className="
    absolute

    bottom-6
left-0

    w-[280px]

    -rotate-6

    transition-transform
    duration-500

    hover:rotate-0
    hover:scale-105
  "
>

  {/* Frame */}

  <div
    className="
      overflow-hidden

      rounded-[42px]

      border-[10px]
      border-[#111111]

      bg-[#111111]

      shadow-[0_35px_70px_rgba(0,0,0,.35)]
    "
  >

    {/* Dynamic Island */}

    <div
      className="
        relative

        flex
        justify-center

        bg-[#111111]

        py-2
      "
    >

      <div
        className="
          h-6
          w-24

          rounded-full

          bg-black
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

         {/* FLOAT CARD */}

<div
  className="
    absolute

    left-8
    top-16

    rounded-3xl

    bg-white

    px-6
    py-5

    shadow-2xl

    transition-all
    duration-300

    hover:-translate-y-1
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
        size={24}
        className="text-emerald-600"
      />

    </div>

    <div>

      <h3
        className="
          text-3xl
          font-black
          text-slate-900
        "
      >
        Rp18.5M
      </h3>

      <p className="text-sm text-slate-500">
        Revenue Bulan Ini
      </p>

    </div>

  </div>

</div>

{/* FLOAT CARD */}

<div
  className="
    absolute

    right-4
    bottom-20

    rounded-3xl

    bg-white

    px-6
    py-5

    shadow-2xl

    transition-all
    duration-300

    hover:-translate-y-1
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

        bg-blue-100
      "
    >

      <Wallet
        size={24}
        className="text-blue-600"
      />

    </div>

    <div>

      <h3
        className="
          text-3xl
          font-black
          text-slate-900
        "
      >
        2.450
      </h3>

      <p className="text-sm text-slate-500">
        Transaksi Hari Ini
      </p>

    </div>

  </div>

</div>

        </div>

      </div>

    </section>
  );
}