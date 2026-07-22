"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useReportStore } from "../store/report.store";

export function ExportPdfButton() {
  const history = useReportStore(
    (state) => state.data.history
  );

  const summary = useReportStore(
    (state) => state.data.summary
  );

  const business = useReportStore(
    (state) => state.data.business
  );

  function exportPdf() {
    if (history.length === 0) {
      alert("Belum ada data.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      business.name || "IndoPOS",
      14,
      18
    );

    doc.setFontSize(10);

    if (business.address) {
      doc.text(
        business.address,
        14,
        24
      );
    }

    if (business.phone) {
      doc.text(
        `Telp : ${business.phone}`,
        14,
        30
      );
    }

    if (business.email) {
      doc.text(
        business.email,
        14,
        36
      );
    }

    doc.setFontSize(12);

    doc.text(
      "Laporan Transaksi",
      14,
      46
    );

    doc.setFontSize(10);

    doc.text(
      `Tanggal Cetak : ${new Date().toLocaleString(
        "id-ID"
      )}`,
      14,
      54
    );

    doc.text(
      `Total Income : Rp ${summary.totalIncome.toLocaleString(
        "id-ID"
      )}`,
      14,
      64
    );

    doc.text(
      `Total Expense : Rp ${summary.totalExpense.toLocaleString(
        "id-ID"
      )}`,
      14,
      70
    );

    doc.text(
      `Gross Profit : Rp ${summary.grossProfit.toLocaleString(
        "id-ID"
      )}`,
      14,
      76
    );

    doc.text(
      `Net Profit : Rp ${summary.netProfit.toLocaleString(
        "id-ID"
      )}`,
      14,
      82
    );

    autoTable(doc, {
      startY: 90,

      head: [[
        "Tanggal",
        "Jenis",
        "Invoice",
        "Status",
        "Total",
      ]],

      body: history.map((item) => [
        new Date(
          item.created_at
        ).toLocaleDateString(
          "id-ID"
        ),

        item.type,

        item.invoice,

        item.status,

        `Rp ${item.total.toLocaleString(
          "id-ID"
        )}`,
      ]),
    });

    doc.save(
      `Report-${
        new Date()
          .toISOString()
          .slice(0, 10)
      }.pdf`
    );
  }

  return (
    <button
      onClick={exportPdf}
      className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
    >
      Export PDF
    </button>
  );
}