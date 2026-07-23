"use client";

import { useEffect } from "react";

import {
  FileSpreadsheet,
  FileText,
  Printer,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header/PageHeader";

import { useReportStore } from "../store/report.store";

import { ReportsFilter } from "../components/ReportsFilter";
import { ReportsSummary } from "../components/ReportsSummary";
import { ReportsTable } from "../components/ReportsTable";
import { ReportsProductTable } from "../components/ReportsProductTable";

import { ExportExcelButton } from "../components/ExportExcelButton";
import { ExportPdfButton } from "../components/ExportPdfButton";
import { PrintReportButton } from "../components/PrintReportButton";

type Props = {
  businessId: string;
};

export function ReportsPage({
  businessId,
}: Props) {
  const fetchReports =
    useReportStore(
      (state) => state.fetchReports
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
    <div className="space-y-6">

      <PageHeader
        title="Reports"
        subtitle="Laporan penjualan, pembelian, stok dan keuangan."
      />

      {/* FILTER */}

      <ReportsFilter
        businessId={businessId}
      />

      {/* ACTION */}

      <div
        className="
          flex
          flex-col
          gap-3
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <h3 className="text-lg font-semibold">
            Export & Cetak
          </h3>

          <p className="text-sm text-slate-500">
            Download atau cetak laporan dengan cepat.
          </p>

        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">

            <FileSpreadsheet
              size={18}
              className="text-emerald-600"
            />

            <ExportExcelButton />

          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">

            <FileText
              size={18}
              className="text-red-600"
            />

            <ExportPdfButton />

          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">

            <Printer
              size={18}
              className="text-blue-600"
            />

            <PrintReportButton />

          </div>

        </div>

      </div>

      {/* SUMMARY */}

      <ReportsSummary
        businessId={businessId}
      />

      {/* SALES REPORT */}

      <section className="space-y-3">

        <div>

          <h2 className="text-xl font-bold">
            Laporan Transaksi
          </h2>

          <p className="text-sm text-slate-500">
            Seluruh transaksi sesuai filter yang dipilih.
          </p>

        </div>

        <ReportsTable />

      </section>

      {/* PRODUCT REPORT */}

      <section className="space-y-3">

        <div>

          <h2 className="text-xl font-bold">
            Produk Terlaris
          </h2>

          <p className="text-sm text-slate-500">
            Ringkasan performa setiap produk.
          </p>

        </div>

        <ReportsProductTable
          businessId={businessId}
        />

      </section>

    </div>
  );
}