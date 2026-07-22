"use client";

import * as XLSX from "xlsx";

import { useReportStore } from "../store/report.store";

export function ExportExcelButton() {
  const history = useReportStore(
    (state) => state.data.history
  );

  const business = useReportStore(
    (state) => state.data.business
  );

  function exportExcel() {
    if (history.length === 0) {
      alert("Belum ada data.");
      return;
    }

    const rows = [
      {
        "Nama Bisnis": business.name,
        Alamat: business.address,
        Telepon: business.phone,
        Email: business.email,
      },

      {},

      ...history.map((item) => ({
        Tanggal: new Date(
          item.created_at
        ).toLocaleDateString("id-ID"),

        Jenis: item.type,

        Invoice: item.invoice,

        Status: item.status,

        Total: item.total,
      })),
    ];

    const worksheet =
      XLSX.utils.json_to_sheet(rows);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Reports"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const blob = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const today = new Date();

    const fileName = `Report-${
      today
        .toISOString()
        .slice(0, 10)
    }.xlsx`;

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportExcel}
      className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
    >
      Export Excel
    </button>
  );
}