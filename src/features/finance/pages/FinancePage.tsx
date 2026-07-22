"use client";

import { PageHeader } from "@/components/app/page-header/PageHeader";

import { FinanceFilter } from "../components/FinanceFilter";
import { FinanceSummary } from "../components/FinanceSummary";
import { FinanceChart } from "../components/FinanceChart";
import { FinanceHistory } from "../components/FinanceHistory";

type Props = {
  businessId: string;
};

export function FinancePage({
  businessId,
}: Props) {
  return (
    <>
      <PageHeader
        title="Finance"
        subtitle="Ringkasan keuangan, pemasukan, pengeluaran, dan riwayat transaksi."
      />

      <FinanceFilter
        businessId={businessId}
      />

      <FinanceSummary
        businessId={businessId}
      />

      <div className="mt-6">
        <FinanceChart
          businessId={businessId}
        />
      </div>

      <div className="mt-6">
        <FinanceHistory
          businessId={businessId}
        />
      </div>
    </>
  );
}