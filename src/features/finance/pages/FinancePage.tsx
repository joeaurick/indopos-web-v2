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
    <div className="space-y-6 lg:space-y-8">

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

      <FinanceChart
        businessId={businessId}
      />

      <FinanceHistory
        businessId={businessId}
      />

    </div>
  );
}