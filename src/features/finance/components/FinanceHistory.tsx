"use client";

import { useEffect } from "react";

import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  Receipt,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useFinanceStore } from "../store/finance.store";

type Props = {
  businessId: string;
};

export function FinanceHistory({
  businessId,
}: Props) {

  const fetchFinance =
    useFinanceStore(
      (state) => state.fetchFinance
    );

  const loading =
    useFinanceStore(
      (state) => state.loading
    );

  const history =
    useFinanceStore(
      (state) => state.data.history
    );

  const filter =
    useFinanceStore(
      (state) => state.filter
    );

  useEffect(() => {
    fetchFinance(
      businessId,
      filter
    );
  }, [
    businessId,
    filter,
    fetchFinance,
  ]);

  function getType(item: any) {

    switch (item.type) {

      case "SALE":
        return {
          label: "Sales",
          icon: (
            <ArrowUpCircle
              size={18}
            />
          ),
          badge:
            "bg-emerald-100 text-emerald-700",
          amount:
            "text-emerald-600",
          prefix: "+",
        };

      case "CASH_IN":
        return {
          label: "Cash In",
          icon: (
            <ArrowUpCircle
              size={18}
            />
          ),
          badge:
            "bg-cyan-100 text-cyan-700",
          amount:
            "text-cyan-600",
          prefix: "+",
        };

      case "PURCHASE":
        return {
          label: "Purchase",
          icon: (
            <ArrowDownCircle
              size={18}
            />
          ),
          badge:
            "bg-orange-100 text-orange-700",
          amount:
            "text-orange-600",
          prefix: "-",
        };

      case "EXPENSE":
        return {
          label: "Cash Out",
          icon: (
            <Wallet
              size={18}
            />
          ),
          badge:
            "bg-red-100 text-red-700",
          amount:
            "text-red-600",
          prefix: "-",
        };

      default:
        return {
          label: item.type,
          icon: <Receipt size={18} />,
          badge:
            "bg-slate-100 text-slate-700",
          amount:
            "text-slate-600",
          prefix: "",
        };

    }

  }

  return (

    <Card
      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
    "
    >

      <div
        className="
        border-b
        border-slate-100
        p-5
        lg:p-6
      "
      >

        <h2 className="text-xl font-bold">
          Riwayat Keuangan
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Semua transaksi Sales,
          Purchase,
          Cash In,
          dan Cash Out.
        </p>

      </div>

      {loading ? (

        <div className="p-10 text-center text-slate-400">
          Loading...
        </div>

      ) : history.length === 0 ? (

        <div className="p-10 text-center text-slate-400">
          Belum ada transaksi.
        </div>

      ) : (

        <>

          {/* ===========================
               Desktop Table
          =========================== */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="min-w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Jenis
                  </th>

                  <th className="px-6 py-4 text-left">
                    Invoice
                  </th>

                  <th className="px-6 py-4 text-left">
                    Tanggal
                  </th>

                  <th className="px-6 py-4 text-center">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right">
                    Nominal
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map(
                  (item) => {

                    const type =
                      getType(item);

                    return (

                      <tr
                        key={`${item.type}-${item.id}`}
                        className="border-t hover:bg-slate-50"
                      >

                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${type.badge}`}
                          >
                            {type.icon}
                            {type.label}
                          </span>

                        </td>

                        <td className="px-6 py-4 font-medium">
                          {item.invoice}
                        </td>

                        <td className="px-6 py-4">
                          {new Date(
                            item.created_at
                          ).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td className="px-6 py-4 text-center">

                          <span
                            className="
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                          "
                          >
                            {item.status}
                          </span>

                        </td>

                        <td
                          className={`px-6 py-4 text-right text-lg font-bold ${type.amount}`}
                        >

                          {type.prefix} Rp{" "}
                          {item.total.toLocaleString(
                            "id-ID"
                          )}

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

          {/* ===========================
                 Mobile Card
          =========================== */}

          <div className="space-y-4 p-4 lg:hidden">

            {history.map(
              (item) => {

                const type =
                  getType(item);

                return (

                  <div
                    key={`${item.type}-${item.id}`}
                    className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    shadow-sm
                  "
                  >

                    <div className="flex items-start justify-between">

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${type.badge}`}
                      >
                        {type.icon}
                        {type.label}
                      </span>

                      <span
                        className="
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                      "
                      >
                        {item.status}
                      </span>

                    </div>

                    <div className="mt-4">

                      <div className="text-sm text-slate-500">
                        Invoice
                      </div>

                      <div className="font-semibold break-all">
                        {item.invoice}
                      </div>

                    </div>

                    <div className="mt-3 flex justify-between">

                      <div>

                        <div className="text-xs text-slate-400">
                          Tanggal
                        </div>

                        <div className="text-sm font-medium">

                          {new Date(
                            item.created_at
                          ).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </div>

                      </div>

                      <div className="text-right">

                        <div className="text-xs text-slate-400">
                          Nominal
                        </div>

                        <div
                          className={`font-bold ${type.amount}`}
                        >

                          {type.prefix} Rp{" "}
                          {item.total.toLocaleString(
                            "id-ID"
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </>

      )}

    </Card>

  );

}