"use client";

import {
  CreditCard,
  Wallet,
  Landmark,
} from "lucide-react";

import { motion } from "framer-motion";

import { AppCard } from "@/components/ui";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardPaymentMethod() {
  const payments =
    useDashboardStore(
      (state) => state.data.paymentMethods
    );

  const total =
    payments.reduce(
      (sum, item) => sum + item.total,
      0
    ) || 1;

  const getIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return <Wallet size={20} />;

      case "transfer":
        return <Landmark size={20} />;

      default:
        return <CreditCard size={20} />;
    }
  };

  return (
    <AppCard className="rounded-3xl p-6">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Payment Method
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Distribusi metode pembayaran hari ini.
          </p>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-500
            to-teal-600
            text-white
            shadow-lg
          "
        >
          <Wallet size={24} />
        </div>

      </div>

      {/* Empty */}

      {payments.length === 0 && (

        <div
          className="
            flex
            h-56
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-slate-200
            bg-slate-50
          "
        >

          <Wallet
            size={40}
            className="mb-4 text-slate-300"
          />

          <h3 className="font-semibold text-slate-700">
            Belum ada transaksi
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Metode pembayaran akan muncul di sini.
          </p>

        </div>

      )}

      {/* List */}

      <div className="space-y-4">

        {payments.map((item, index) => {

          const percent =
            (item.total / total) * 100;

          return (

            <motion.div
              key={item.method}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-emerald-50
                      text-emerald-600
                    "
                  >
                    {getIcon(item.method)}
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {item.method}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {item.count} transaksi
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-lg font-bold">
                    Rp{" "}
                    {item.total.toLocaleString(
                      "id-ID"
                    )}
                  </p>

                  <p className="text-xs text-slate-500">
                    {percent.toFixed(1)}%
                  </p>

                </div>

              </div>

              <div className="mt-5">

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percent}%`,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-emerald-500
                      to-teal-600
                    "
                  />

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>

    </AppCard>
  );
}