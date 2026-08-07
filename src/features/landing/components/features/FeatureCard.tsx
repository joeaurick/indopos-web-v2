"use client";

import Link from "next/link";

import {
  ArrowRight,
  Check,
} from "lucide-react";

import { FeatureItem } from "./feature.data";

type Props = {
  item: FeatureItem;
};

export function FeatureCard({
  item,
}: Props) {
  return (
    <article
      className="
        group

        overflow-hidden

        rounded-[32px]

        border
        border-slate-200

        bg-white

        shadow-sm

        transition-all
        duration-500

        hover:-translate-y-2
        hover:shadow-2xl

        h-full
      "
    >
      {/* IMAGE */}

      <div className="mx-auto max-w-3xl text-center">
  <div className="flex justify-center">
    <span className="inline-flex rounded-full bg-[#343C67]/10 px-4 py-2 text-sm font-semibold text-[#343C67]">
      Features
    </span>
  </div>

  <h2 className="mt-8 text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
    Semua Yang Anda Butuhkan
    <br />
    Dalam Satu Platform.
  </h2>

  <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
    IndoPOS membantu Anda mengelola kasir, inventory, pelanggan, pembukuan,
    laporan bisnis hingga multi outlet dengan pengalaman yang cepat, modern,
    dan mudah digunakan.
  </p>
</div>

      {/* CONTENT */}

      <div className="p-7 lg:p-8">

        {/* BADGE */}

        <div
          className={`
            inline-flex

            rounded-full

            bg-gradient-to-r

            ${item.color}

            px-4
            py-2

            text-sm
            font-semibold

            text-white
          `}
        >
          {item.title}
        </div>

        {/* TITLE */}

        <h3
          className="
            mt-8

            text-2xl lg:text-3xl

            font-bold

            text-slate-900
          "
        >
          {item.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-5

            leading-8

            text-slate-500
          "
        >
          {item.description}
        </p>

        {/* BULLETS */}

        <div
          className="
            mt-8

            space-y-4
          "
        >
          {item.bullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-center gap-3"
            >
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center

                  rounded-full

                  bg-emerald-100
                "
              >
                <Check
                  size={16}
                  className="text-emerald-600"
                />
              </div>

              <span className="text-[15px] text-slate-700">
                {bullet}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}

        <Link
          href="#"
          className="
            mt-10

            inline-flex
            items-center
            gap-2

            font-semibold

            text-[#343C67]

            transition-all
            duration-300

            group-hover:gap-4
          "
        >
          Pelajari Selengkapnya

          <ArrowRight size={18} />
        </Link>

      </div>
    </article>
  );
}