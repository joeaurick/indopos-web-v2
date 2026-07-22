"use client";

import { Card } from "@/components/ui/Card";

import { useReportStore } from "../store/report.store";

export function ReportsTable() {
  const loading =
    useReportStore(
      (state) => state.loading
    );

  const history =
    useReportStore(
      (state) => state.data.history
    );

  function getBadge(type: string) {
    switch (type) {
      case "SALE":
        return "bg-green-100 text-green-700";

      case "PURCHASE":
        return "bg-orange-100 text-orange-700";

      case "CASH_IN":
        return "bg-cyan-100 text-cyan-700";

      case "EXPENSE":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <Card className="overflow-hidden">

      <div className="border-b p-6">

        <h2 className="text-xl font-semibold">
          Data Report
        </h2>

        <p className="text-sm text-slate-500">
          Seluruh transaksi berdasarkan filter.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Tanggal
              </th>

              <th className="px-5 py-4 text-left">
                Jenis
              </th>

              <th className="px-5 py-4 text-left">
                Invoice
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-right">
                Total
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
                  Belum ada data.
                </td>

              </tr>

            ) : (

              history.map((item) => (

                <tr
                  key={`${item.type}-${item.id}`}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    {new Date(
                      item.created_at
                    ).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadge(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>

                  </td>

                  <td className="px-5 py-4 font-medium">
                    {item.invoice}
                  </td>

                  <td className="px-5 py-4">
                    {item.status}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold">
                    Rp{" "}
                    {item.total.toLocaleString(
                      "id-ID"
                    )}
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