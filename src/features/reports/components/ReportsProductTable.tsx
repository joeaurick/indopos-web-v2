"use client";

import { useEffect } from "react";

import { Card } from "@/components/ui/Card";

import { useReportStore } from "../store/report.store";

type Props = {
  businessId: string;
};

export function ReportsProductTable({
  businessId,
}: Props) {
  const fetchReports =
    useReportStore(
      (state) => state.fetchReports
    );

  const loading =
    useReportStore(
      (state) => state.loading
    );

  const products =
    useReportStore(
      (state) => state.data.products
    );

  useEffect(() => {
    fetchReports(
      businessId,
      {
        type: "all",
      }
    );
  }, [
    businessId,
    fetchReports,
  ]);

  return (
    <Card className="overflow-hidden">

      <div className="border-b p-6">

        <h2 className="text-xl font-semibold">
          Report Produk
        </h2>

        <p className="text-sm text-slate-500">
          Ringkasan penjualan setiap produk.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-center">
                Rank
              </th>

              <th className="px-5 py-4 text-left">
                Produk
              </th>

              <th className="px-5 py-4 text-right">
                Qty
              </th>

              <th className="px-5 py-4 text-right">
                Omzet
              </th>

              <th className="px-5 py-4 text-right">
                Profit
              </th>

              <th className="px-5 py-4 text-center">
                %
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center"
                >
                  Loading...
                </td>

              </tr>

            ) : products.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center"
                >
                  Belum ada data.
                </td>

              </tr>

            ) : (

              products.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-5 py-4 text-center font-bold">

                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}

                  </td>

                  <td className="px-5 py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-right">
                    {item.qty}
                  </td>

                  <td className="px-5 py-4 text-right">
                    Rp{" "}
                    {item.omzet.toLocaleString(
                      "id-ID"
                    )}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold text-emerald-600">
                    Rp{" "}
                    {item.profit.toLocaleString(
                      "id-ID"
                    )}
                  </td>

                  <td className="px-5 py-4 text-center font-semibold text-blue-600">
                    {item.percentage}%
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </Card>
  );
}