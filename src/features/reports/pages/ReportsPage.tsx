"use client";

import {
  useEffect,
} from "react";

import { PageHeader } from "@/components/app/page-header/PageHeader";

import { useReportStore } from "../store/report.store";

import { ReportsFilter } from "../components/ReportsFilter";
import { ReportsSummary } from "../components/ReportsSummary";
import { ReportsTable } from "../components/ReportsTable";
import { ExportExcelButton } from "../components/ExportExcelButton";
import { ExportPdfButton } from "../components/ExportPdfButton";
import { PrintReportButton } from "../components/PrintReportButton";
import { ReportsProductTable } from "../components/ReportsProductTable";

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
    <>
      <PageHeader
        title="Reports"
        subtitle="Laporan penjualan, pembelian, stok dan keuangan."
      />

      <div className="flex flex-wrap items-center gap-3">

        <ReportsFilter
          businessId={businessId}
        />

        <ExportExcelButton />

        <ExportPdfButton />

        <PrintReportButton />

      </div>

      <div className="mt-6">
        <ReportsSummary businessId={businessId} />
      </div>

      <div className="mt-6">
        <ReportsTable />
      </div>

      <div className="mt-6">
        <ReportsProductTable businessId={businessId} />
      </div>
    </>
  );
}