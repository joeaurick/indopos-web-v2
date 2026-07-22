"use client";

import { useEffect } from "react";

import {
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useCashOutStore } from "../store/cash-out.store";

type Props = {
  businessId: string;

  onEdit?: (id: string) => void;

  onDelete?: (id: string) => void;
};

export function CashOutTable({
  businessId,
  onEdit,
  onDelete,
}: Props) {
  const fetchCashOut =
    useCashOutStore(
      (state) => state.fetchCashOut
    );

  const loading =
    useCashOutStore(
      (state) => state.loading
    );

  const expenses =
    useCashOutStore(
      (state) => state.data.expenses
    );

  useEffect(() => {
    fetchCashOut(
      businessId
    );
  }, [
    businessId,
    fetchCashOut,
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

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Nominal
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Metode
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Bukti
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
                  colSpan={8}
                  className="p-8 text-center text-slate-400"
                >
                  Loading...
                </td>

              </tr>

            ) : expenses.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="p-8 text-center text-slate-400"
                >
                  Belum ada data pengeluaran.
                </td>

              </tr>

            ) : (

              expenses.map(
                (
                  expense,
                  index
                ) => (

                  <tr
                    key={expense.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      {new Date(
                        expense.expense_date
                      ).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {expense.category
                        ?.name ?? "-"}
                    </td>

                    <td className="px-5 py-4">

                      <div className="font-medium">
                        {expense.title}
                      </div>

                      {expense.description && (

                        <div className="text-sm text-slate-500">
                          {expense.description}
                        </div>

                      )}

                    </td>

                    <td className="px-5 py-4 text-right font-semibold text-red-600">

                      Rp{" "}

                      {Number(
                        expense.amount
                      ).toLocaleString(
                        "id-ID"
                      )}

                    </td>

                    <td className="px-5 py-4 text-center">
                      {expense.payment_method}
                    </td>

                    <td className="px-5 py-4 text-center">

                      {expense.attachment_url ? (

                        <a
                          href={
                            expense.attachment_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                        >
                          <ExternalLink
                            size={16}
                          />
                          Lihat Bukti
                        </a>

                      ) : (

                        <span className="text-slate-400">
                          -
                        </span>

                      )}

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            onEdit?.(
                              expense.id
                            )
                          }
                          className="rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
                        >
                          <Pencil
                            size={16}
                          />
                        </button>

                        <button
                          onClick={() =>
                            onDelete?.(
                              expense.id
                            )
                          }
                          className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                        >
                          <Trash2
                            size={16}
                          />
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