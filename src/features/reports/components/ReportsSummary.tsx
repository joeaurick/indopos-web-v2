"use client";

import { useEffect } from "react";

import {
  Banknote,
  ArrowDownCircle,
  TrendingUp,
  Landmark,
  Receipt,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useReportStore } from "../store/report.store";

type Props = {
  businessId: string;
};

type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  count?: boolean;
};

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
  count = false,
}: SummaryCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {count
              ? value.toLocaleString("id-ID")
              : `Rp ${value.toLocaleString("id-ID")}`}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white ${color}`}
        >
          <Icon size={30} />
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
      value: summary.totalIncome,
      icon: Banknote,
      color: "bg-emerald-600",
    },
    {
      title: "Total Expense",
      value: summary.totalExpense,
      icon: ArrowDownCircle,
      color: "bg-red-600",
    },
    {
      title: "Gross Profit",
      value: summary.grossProfit,
      icon: TrendingUp,
      color: "bg-blue-600",
    },
    {
      title: "Net Profit",
      value: summary.netProfit,
      icon: Landmark,
      color: "bg-violet-600",
    },
    {
      title: "Total Transaksi",
      value: summary.totalTransactions,
      icon: Receipt,
      color: "bg-slate-700",
      count: true,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div key={card.title}>
          {loading ? (
            <Card className="h-[120px] animate-pulse" />
          ) : (
            <SummaryCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              count={card.count}
            />
          )}
        </div>
      ))}
    </div>
  );
}