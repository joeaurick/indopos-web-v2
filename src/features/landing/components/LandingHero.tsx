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
          gap-20

          px-6
          py-24

          lg:grid-cols-2
          lg:px-8
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

            Enterprise Point of Sale
          </div>

          <h1
            className="
              mt-8

              text-5xl

              font-black
              leading-tight

              lg:text-7xl
            "
          >
            Kelola
            <br />

            Bisnis Anda
            <br />

            Lebih Mudah.
          </h1>

          <p
            className="
              mt-8

              max-w-xl

              text-lg
              leading-8

              text-indigo-100
            "
          >
            IndoPOS membantu Anda mengelola
            penjualan, inventory, pelanggan,
            supplier, laporan hingga multi outlet
            dalam satu platform modern.
          </p>

          {/* BUTTON */}

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

    transition
    hover:scale-[1.02]
  "
>
  <span className="text-[#343C67]">
    Mulai Gratis
  </span>

  <ArrowRight
    size={18}
    className="text-[#343C67]"
  />
</Link>

            <Link
              href="/login"
              className="
                inline-flex
                items-center
                gap-3

                rounded-2xl

                border
                border-white/20

                bg-white/10

                px-7
                py-4

                font-semibold

                backdrop-blur

                transition

                hover:bg-white/20
              "
            >
              <Play size={18} />

              Login
            </Link>

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

    w-[650px]

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

    w-[250px]

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

          {/* FLOATING */}

          <div
            className="
              absolute

              left-56
              top-12

              flex
              items-center
              gap-3

              rounded-2xl

              bg-white

              px-5
              py-4

              text-slate-900

              shadow-xl
            "
          >

            <Monitor
              className="text-[#343C67]"
              size={22}
            />

            <div>

              <p className="text-xs text-slate-500">
                Dashboard
              </p>

              <h4 className="font-bold">
                Business Management
              </h4>

            </div>

          </div>

          <div
            className="
              absolute

              right-8
              bottom-32

              flex
              items-center
              gap-3

              rounded-2xl

              bg-white

              px-5
              py-4

              text-slate-900

              shadow-xl
            "
          >

            <Smartphone
              className="text-emerald-600"
              size={22}
            />

            <div>

              <p className="text-xs text-slate-500">
                Flutter
              </p>

              <h4 className="font-bold">
                POS Mobile
              </h4>

            </div>

          </div>

          <div
            className="
              absolute

              left-64
              bottom-12

              flex
              items-center
              gap-3

              rounded-2xl

              bg-white

              px-5
              py-4

              text-slate-900

              shadow-xl
            "
          >

            <BarChart3
              className="text-blue-600"
              size={22}
            />

            <div>

              <p className="text-xs text-slate-500">
                Analytics
              </p>

              <h4 className="font-bold">
                Real-time Report
              </h4>

            </div>

          </div>

          {/* FLOAT CARD 1 */}

<div
  className="
    absolute

    left-2
top-20

    rounded-3xl

    border
    border-white/20

    bg-white/90

    px-6
    py-5

    backdrop-blur-xl

    shadow-2xl

    animate-[float_6s_ease-in-out_infinite]
  "
>

  <div className="flex items-center gap-4">

    <div
      className="
        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-2xl

        bg-emerald-100
      "
    >

      <TrendingUp
        className="text-emerald-600"
        size={22}
      />

    </div>

    <div>

      <h4
        className="
          text-2xl
          font-black
          text-slate-900
        "
      >
        2.450
      </h4>

      <p
        className="
          text-sm
          text-slate-500
        "
      >
        Transaksi Hari Ini
      </p>

    </div>

  </div>

</div>

{/* FLOAT CARD 2 */}

<div
  className="
    absolute

    right-6
top-28

    rounded-3xl

    border
    border-white/20

    bg-white/90

    px-6
    py-5

    backdrop-blur-xl

    shadow-2xl

    animate-[float_7s_ease-in-out_infinite]
  "
>

  <div className="flex items-center gap-4">

    <div
      className="
        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-2xl

        bg-sky-100
      "
    >

      <Cloud
        className="text-sky-600"
        size={22}
      />

    </div>

    <div>

      <h4
        className="
          text-2xl
          font-black
          text-slate-900
        "
      >
        99.9%
      </h4>

      <p
        className="
          text-sm
          text-slate-500
        "
      >
        Cloud Sync
      </p>

    </div>

  </div>

</div>

{/* FLOAT CARD 3 */}

<div
  className="
    absolute

    left-14
bottom-28

    rounded-3xl

    border
    border-white/20

    bg-white/90

    px-6
    py-5

    backdrop-blur-xl

    shadow-2xl

    animate-[float_5s_ease-in-out_infinite]
  "
>

  <div className="flex items-center gap-4">

    <div
      className="
        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-2xl

        bg-violet-100
      "
    >

      <Store
        className="text-violet-600"
        size={22}
      />

    </div>

    <div>

      <h4
        className="
          text-2xl
          font-black
          text-slate-900
        "
      >
        24
      </h4>

      <p
        className="
          text-sm
          text-slate-500
        "
      >
        Outlet Aktif
      </p>

    </div>

  </div>

</div>

{/* FLOAT CARD 4 */}

<div
  className="
    absolute

    right-8
bottom-12

    rounded-3xl

    border
    border-white/20

    bg-white/90

    px-6
    py-5

    backdrop-blur-xl

    shadow-2xl

    animate-[float_8s_ease-in-out_infinite]
  "
>

  <div className="flex items-center gap-4">

    <div
      className="
        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-2xl

        bg-orange-100
      "
    >

      <Wallet
        className="text-orange-600"
        size={22}
      />

    </div>

    <div>

      <h4
        className="
          text-2xl
          font-black
          text-slate-900
        "
      >
        Rp18.5M
      </h4>

      <p
        className="
          text-sm
          text-slate-500
        "
      >
        Revenue
      </p>

    </div>

  </div>

</div>

        </div>

      </div>

    </section>
  );
}