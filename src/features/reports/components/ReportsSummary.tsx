"use client";

import { useEffect } from "react";

import {
  WalletCards,
  BadgeDollarSign,
  ChartSpline,
  CircleDollarSign,
  ReceiptText,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useReportStore } from "../store/report.store";

type Props = {
  businessId: string;
};

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  count?: boolean;
};

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  count = false,
}: SummaryCardProps) {
  return (
    <Card
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">

        <div className="min-w-0 flex-1">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            {count
              ? value.toLocaleString("id-ID")
              : `Rp ${value.toLocaleString("id-ID")}`}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>

        </div>

        <div
          className={`
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${iconBg}
            ${iconColor}
            transition-transform
            duration-300
            group-hover:scale-110
          `}
        >
          <Icon size={30} strokeWidth={2.2} />
        </div>

      </div>
    </Card>
  );
}

export function ReportsSummary({
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

  const summary =
    useReportStore(
      (state) => state.data.summary
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

  const cards = [
    {
      title: "Total Income",
      description: "Total pemasukan",
      value: summary.totalIncome,
      icon: WalletCards,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Expense",
      description: "Total pengeluaran",
      value: summary.totalExpense,
      icon: BadgeDollarSign,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Gross Profit",
      description: "Laba kotor",
      value: summary.grossProfit,
      icon: ChartSpline,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Net Profit",
      description: "Laba bersih",
      value: summary.netProfit,
      icon: CircleDollarSign,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Transaksi",
      description: "Jumlah transaksi",
      value: summary.totalTransactions,
      icon: ReceiptText,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
      count: true,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {cards.map((card) => (

        <div key={card.title}>

          {loading ? (

            <Card className="h-[150px] animate-pulse rounded-3xl" />

          ) : (

            <SummaryCard
              title={card.title}
              description={card.description}
              value={card.value}
              icon={card.icon}
              iconBg={card.iconBg}
              iconColor={card.iconColor}
              count={card.count}
            />

          )}

        </div>

      ))}
    </div>
  );
}