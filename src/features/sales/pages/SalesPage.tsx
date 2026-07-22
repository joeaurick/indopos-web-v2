"use client";

import {
  useEffect,
  useMemo,
} from "react";

import { Eye } from "lucide-react";

import { useSalesStore } from "../store/sales-store";
import { useSaleDetailStore } from "../store/sale-detail-store";

import { SalesDetailDialog } from "../components/SalesDetailDialog";

type Props = {
  businessId: string;
};

export function SalesPage({
  businessId,
}: Props) {
  const sales = useSalesStore(
    (state) => state.sales
  );

  const loading = useSalesStore(
    (state) => state.loading
  );

  const search = useSalesStore(
    (state) => state.search
  );

  const setSearch = useSalesStore(
    (state) => state.setSearch
  );

  const fetchSales = useSalesStore(
    (state) => state.fetchSales
  );

  const openDetail =
    useSaleDetailStore(
      (state) => state.openDetail
    );

  useEffect(() => {
    fetchSales(businessId);
  }, [
    businessId,
    fetchSales,
  ]);

  const filteredSales =
    useMemo(() => {
      if (!search.trim()) {
        return sales;
      }

      const keyword =
        search.toLowerCase();

      return sales.filter((sale) =>
        sale.invoice
          .toLowerCase()
          .includes(keyword)
      );
    }, [sales, search]);

  return (
    <div className="space-y-6">
      <div>

        <h1 className="text-3xl font-bold">
          Riwayat Penjualan
        </h1>

        <p className="mt-1 text-slate-500">
          Semua transaksi penjualan.
        </p>

      </div>

      <div className="rounded-2xl bg-white p-5 shadow">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Cari invoice..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-teal-500
          "
        />

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        {loading ? (

          <div className="p-10 text-center">
            Memuat data...
          </div>

        ) : filteredSales.length === 0 ? (

          <div className="p-10 text-center text-slate-500">
            Tidak ada data penjualan.
          </div>

        ) : (

          <table className="w-full">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Invoice
                </th>

                <th className="px-6 py-4 text-left">
                  Tanggal
                </th>

                <th className="px-6 py-4 text-right">
                  Total
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSales.map(
                (sale) => (

                  <tr
                    key={sale.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 font-medium">
                      {sale.invoice}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(
                        sale.created_at
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </td>

                    <td className="px-6 py-4 text-right font-semibold">
                      Rp{" "}
                      {Number(
                        sale.total
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${
                            sale.status ===
                            "PAID"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {sale.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() =>
                          openDetail(
                            businessId,
                            sale.id,
                            sale.invoice,
                            sale.created_at,
                            Number(
                              sale.total
                            ),
                            Number(
                              sale.payment_amount
                            ),
                            Number(
                              sale.change_amount
                            )
                          )
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-teal-600
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-white
                          hover:bg-teal-700
                        "
                      >
                        <Eye size={16} />
                        Detail
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

      <SalesDetailDialog />

    </div>
  );
}