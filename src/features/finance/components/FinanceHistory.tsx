"use client";

import { useEffect } from "react";

import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
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
          icon: null,
          badge:
            "bg-slate-100 text-slate-700",
          amount:
            "text-slate-600",
          prefix: "",
        };
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-semibold">
          Riwayat Keuangan
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Seluruh transaksi Sales,
          Cash In, Purchase dan
          Cash Out.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Jenis
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Invoice / Receipt
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Tanggal
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Nominal
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-slate-400"
                >
                  Loading...
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-slate-400"
                >
                  Belum ada transaksi.
                </td>
              </tr>
            ) : (
              history.map((item) => {
                const type =
                  getType(item);

                return (
                  <tr
                    key={`${item.type}-${item.id}`}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${type.badge}`}
                      >
                        {type.icon}
                        {type.label}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {item.invoice}
                    </td>

                    <td className="px-5 py-4">
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

                    <td className="px-5 py-4 text-center">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {item.status}
                      </span>
                    </td>

                    <td
                      className={`px-5 py-4 text-right text-lg font-bold ${type.amount}`}
                    >
                      {type.prefix} Rp{" "}
                      {item.total.toLocaleString(
                        "id-ID"
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}