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
    <section className="bg-slate-50 py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}

          <div>

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
                font-bold
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
                mt-6
                text-lg
                leading-8
                text-slate-500
              "
            >
              IndoPOS menggabungkan Dashboard Admin
              berbasis web dengan aplikasi Flutter POS
              sehingga operasional bisnis menjadi
              lebih cepat, mudah dan realtime.
            </p>

            <div className="mt-12 grid gap-5">

              {items.map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.title}
                    className="
                      flex
                      items-start
                      gap-4

                      rounded-3xl

                      bg-white

                      p-5

                      shadow-sm
                    "
                  >

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center

                        rounded-2xl

                        ${item.bg}
                      `}
                    >

                      <Icon
                        size={22}
                        className={item.color}
                      />

                    </div>

                    <div>

                      <h3
                        className="
                          font-semibold
                          text-slate-900
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        {item.desc}
                      </p>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              grid
              grid-cols-2
              gap-6
            "
          >

            <Card
              value="99.9%"
              label="System Uptime"
            />

            <Card
              value="Realtime"
              label="Data Sync"
            />

            <Card
              value="Cloud"
              label="Infrastructure"
            />

            <Card
              value="24/7"
              label="Business Ready"
            />

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