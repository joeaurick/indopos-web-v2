import {
  CheckCircle2,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

export function LoginHero() {
  return (
    <section
      className="
        flex
        h-full
        flex-col
        justify-between

        bg-[#343C67]

        p-10

        text-white
      "
    >
      {/* HEADER */}

      <div>

        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center

            rounded-3xl

            bg-white/10
          "
        >
          <img
            src="/favicon.png"
            alt="IndoPOS"
            className="h-11 w-11 object-contain"
          />
        </div>

        <h1
          className="
            mt-6

            text-5xl
            font-bold
            tracking-tight
          "
        >
          IndoPOS
        </h1>

        <p
          className="
            mt-4
            max-w-md

            text-lg
            leading-8

            text-white/75
          "
        >
          Enterprise Point of Sale modern
          untuk Restaurant, Cafe, Coffee Shop,
          Bakery dan UMKM Indonesia.
        </p>

      </div>

      {/* FITUR */}

      <div className="mt-12 space-y-6">

        <Feature
          icon={<ShoppingCart size={20} />}
          title="Kasir Modern"
          desc="Transaksi cepat dengan tampilan profesional."
        />

        <Feature
          icon={<Package size={20} />}
          title="Inventori"
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
          mt-12

          rounded-3xl

          border
          border-white/10

          bg-white/10

          p-5
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              bg-emerald-500
            "
          >
            <CheckCircle2
              size={18}
              className="text-white"
            />
          </div>

          <div>

            <p
              className="
                text-sm
                font-semibold
              "
            >
              Sistem Aman
            </p>

            <p
              className="
                mt-1

                text-sm

                text-white/70
              "
            >
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
    <div className="flex items-start gap-4">

      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center

          rounded-2xl

          bg-white/10
        "
      >
        {icon}
      </div>

      <div>

        <h3
          className="
            text-lg
            font-semibold
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1

            text-sm
            leading-6

            text-white/70
          "
        >
          {desc}
        </p>

      </div>

    </div>
  );
}