"use client";

import {
  Cloud,
  ShieldCheck,
  Smartphone,
  MonitorSmartphone,
  BarChart3,
  Store,
} from "lucide-react";

const items = [
  {
    icon: Cloud,
    title: "Cloud Native",
    desc: "Data tersimpan aman dan dapat diakses kapan saja.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Smartphone,
    title: "Flutter POS",
    desc: "Aplikasi kasir modern dengan performa tinggi.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: MonitorSmartphone,
    title: "Dashboard Admin",
    desc: "Kelola seluruh bisnis dari satu dashboard.",
    color: "text-[#343C67]",
    bg: "bg-[#EEF1FF]",
  },
  {
    icon: BarChart3,
    title: "Realtime Analytics",
    desc: "Laporan penjualan dan keuntungan secara realtime.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Store,
    title: "Multi Outlet",
    desc: "Kelola seluruh cabang dalam satu akun.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "Menggunakan Supabase Authentication & Database.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export function LandingWhy() {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div
  className="
    mx-auto

    flex
    w-full
    max-w-7xl

    justify-center

    px-6

    lg:px-8
  "
>
  <div
    className="
      flex
      w-full
      max-w-5xl
      flex-col
      items-center
    "
  >
          {/* HEADER */}

          <div className="mx-auto max-w-3xl text-center">
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
              Why IndoPOS
            </span>

            <h2
              className="
                mt-6
                text-4xl
                font-black
                leading-[1.08]
                tracking-tight
                text-slate-900
                lg:text-5xl
              "
            >
              Dibangun Untuk
              <br />
              Bisnis Indonesia
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-slate-500
              "
            >
              IndoPOS menggabungkan Dashboard Admin berbasis web dengan aplikasi
              Flutter POS sehingga operasional bisnis menjadi lebih cepat, mudah,
              dan realtime.
            </p>
          </div>

          {/* FEATURES */}

          <div
  className="
    mt-16

    grid
    w-full
    max-w-4xl

    gap-4
  "
>
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    flex
                    items-center
                    gap-4

                    rounded-3xl

                    border
                    border-slate-200

                    bg-white

                    px-6
                    py-5

                    shadow-sm

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.bg}`}
                  >
                    <Icon size={22} className={item.color} />
                  </div>

                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DIVIDER */}

          <div className="mx-auto my-16 h-px w-full max-w-4xl bg-slate-200" />

          {/* STATS */}

          <div className="mx-auto grid w-full max-w-4xl gap-5 sm:grid-cols-2">
            <Card value="99.9%" label="System Uptime" />
            <Card value="Realtime" label="Data Sync" />
            <Card value="Cloud" label="Infrastructure" />
            <Card value="24/7" label="Business Ready" />
          </div>
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  value: string;
  label: string;
};

function Card({
  value,
  label,
}: CardProps) {
  return (
    <div
      className="
        rounded-3xl

        bg-white

        p-8

        text-center

        shadow-sm
      "
    >

      <div
        className="
          text-4xl
          font-black
          text-[#343C67]
        "
      >
        {value}
      </div>

      <p
        className="
          mt-3
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>

    </div>
  );
}