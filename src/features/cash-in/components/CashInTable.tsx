"use client";

import { useEffect } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useCashInStore } from "../store/cash-in.store";
import type { CashIn } from "../types";

type Props = {
  businessId: string;

  onEdit?: (id: string) => void;

  onDelete?: (id: string) => void;
};

export function CashInTable({
  businessId,
  onEdit,
  onDelete,
}: Props) {
  const fetchCashIn =
    useCashInStore(
      (state) => state.fetchCashIn
    );

  const loading =
    useCashInStore(
      (state) => state.loading
    );

  const cashIn =
    useCashInStore(
      (state) => state.data.cashIn
    );

  useEffect(() => {
    fetchCashIn(businessId);
  }, [
    businessId,
    fetchCashIn,
  ]);

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                No
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Tanggal
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Kategori
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Judul
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Metode
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Nominal
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-8 text-center text-slate-400"
                >
                  Loading...
                </td>

              </tr>

            ) : cashIn.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-8 text-center text-slate-400"
                >
                  Belum ada data pemasukan.
                </td>

              </tr>

            ) : (

              cashIn.map(
                (
                  item: CashIn,
                  index: number
                ) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      {new Date(
                        item.cash_in_date
                      ).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {item.category?.name ?? "-"}
                    </td>

                    <td className="px-5 py-4">

                      <div className="font-medium">
                        {item.title}
                      </div>

                      {item.description && (

                        <div className="mt-1 text-sm text-slate-500">
                          {item.description}
                        </div>

                      )}

                    </td>

                    <td className="px-5 py-4 text-center">
                      {item.payment_method}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold text-emerald-600">
                      Rp{" "}
                      {Number(
                        item.amount
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            onEdit?.(
                              item.id
                            )
                          }
                          className="rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() =>
                            onDelete?.(
                              item.id
                            )
                          }
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>
    </Card>
  );
}