import {
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

export function LoginHero() {
  return (
    <section
  className="
    bg-gradient-to-br
    from-teal-700
    via-teal-800
    to-slate-900

    p-6
    text-white

    lg:flex
    lg:flex-col
    lg:justify-between
    lg:p-12
  "
>
      {/* TOP */}

      <div>
        <div
  className="
    flex
    h-14
    w-14
    lg:h-20
    lg:w-20
            items-center
            justify-center
            rounded-3xl
            bg-white/15
            backdrop-blur
          "
        >
          <ShieldCheck size={40} />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight lg:text-5xl">
          IndoPOS
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-teal-100 lg:mt-5 lg:text-lg lg:leading-8">
          Enterprise Point of Sale modern
          untuk Restaurant, Cafe, Coffee Shop,
          Bakery dan UMKM Indonesia.
        </p>
      </div>

      {/* FEATURES */}

      <div className="mt-8 hidden space-y-6 lg:block">

        <Feature
          icon={<ShoppingCart size={20} />}
          title="Kasir Modern"
          desc="Transaksi cepat dengan tampilan profesional."
        />

        <Feature
          icon={<Package size={20} />}
          title="Inventory"
          desc="Pantau stok barang secara real-time."
        />

        <Feature
          icon={<BarChart3 size={20} />}
          title="Laporan Lengkap"
          desc="Analisis penjualan harian hingga tahunan."
        />

        <Feature
          icon={<Users size={20} />}
          title="Multi User"
          desc="Kelola kasir dan hak akses dengan mudah."
        />

      </div>

      {/* FOOTER */}

      <div
  className="
    mt-8
    hidden
    rounded-3xl
    border
    border-white/10
    bg-white/10
    p-5
    backdrop-blur
    lg:block
  "
>
        <div className="flex items-center gap-3">

          <CheckCircle2
            size={24}
            className="text-emerald-300"
          />

          <div>

            <p className="font-semibold">
              Sistem Aman
            </p>

            <p className="text-sm text-teal-100">
              Data tersimpan aman di Cloud Supabase.
            </p>

          </div>

        </div>
      </div>

    </section>
  );
}

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

function Feature({
  icon,
  title,
  desc,
}: FeatureProps) {
  return (
    <div className="flex gap-4">

      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-white/15
        "
      >
        {icon}
      </div>

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-teal-100">
          {desc}
        </p>

      </div>

    </div>
  );
}