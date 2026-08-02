"use client";

import {
  Monitor,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export function LandingShowcase() {
  return (
    <section
      id="showcase"
      className="
        bg-slate-50

        py-28
      "
    >
      <div
        className="
          mx-auto

          max-w-7xl

          px-6

          lg:px-8
        "
      >

        <div className="text-center">

          <span
            className="
              inline-flex

              rounded-full

              bg-[#343C67]/10

              px-4
              py-2

              text-sm
              font-semibold

              text-[#343C67]
            "
          >
            Showcase
          </span>

          <h2
            className="
              mt-6

              text-4xl

              font-bold

              text-slate-900

              lg:text-5xl
            "
          >
            Semua Bisnis
            <br />

            Dalam Satu Platform
          </h2>

          <p
            className="
              mx-auto
              mt-6

              max-w-3xl

              text-lg
              leading-8

              text-slate-500
            "
          >
            Dashboard Admin dan aplikasi POS
            Flutter saling terhubung secara
            realtime sehingga operasional bisnis
            menjadi lebih mudah.
          </p>

        </div>

        {/* MOCKUP */}

        <div
          className="
            relative

            mt-24

            flex
            justify-center
          "
        >

          {/* Laptop */}

          <div
            className="
              relative

              w-full

              max-w-5xl

              rounded-[34px]

              border

              border-slate-200

              bg-white

              p-5

              shadow-2xl
            "
          >

            <div
              className="
                mb-5

                flex
                items-center
                gap-3
              "
            >

              <Monitor
                className="text-[#343C67]"
                size={22}
              />

              <h3
                className="
                  text-lg

                  font-semibold
                "
              >
                Dashboard Admin
              </h3>

            </div>

            <img
              src="/landing/dashboard.png"
              alt="Dashboard"

              className="
                rounded-2xl
              "
            />

          </div>

          {/* Phone */}

          <div
            className="
              absolute

              -bottom-10
              left-8

              hidden

              w-64

              rounded-[40px]

              border-[10px]
              border-black

              bg-black

              shadow-2xl

              lg:block
            "
          >

            <img
              src="/landing/mobile-pos.png"
              alt="Flutter POS"

              className="
                rounded-[28px]
              "
            />

          </div>

        </div>

        {/* FEATURE */}

        <div
          className="
            mt-28

            grid

            gap-6

            md:grid-cols-3
          "
        >

          <Item
            title="Realtime Sync"
          />

          <Item
            title="Multi Outlet"
          />

          <Item
            title="Cloud Based"
          />

        </div>

      </div>

    </section>
  );
}

type ItemProps = {
  title: string;
};

function Item({
  title,
}: ItemProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        rounded-2xl

        border
        border-slate-200

        bg-white

        p-5

        shadow-sm
      "
    >

      <CheckCircle2
        size={22}
        className="text-emerald-600"
      />

      <span
        className="
          font-semibold

          text-slate-800
        "
      >
        {title}
      </span>

    </div>
  );
}