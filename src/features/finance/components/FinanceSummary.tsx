"use client";

import { useEffect } from "react";

import {
  Banknote,
  ArrowDownCircle,
  TrendingUp,
  Landmark,
  ShoppingBag,
  Wallet,
  CircleDollarSign,
  Receipt,
  ArrowUpRight,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useFinanceStore } from "../store/finance.store";

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
    <Card
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-5
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      <div
        className="
        absolute
        right-0
        top-0
        h-24
        w-24
        rounded-full
        bg-slate-100/60
        blur-3xl
      "
      />

      <div className="relative flex items-start justify-between">

        <div className="flex-1">

          <p
            className="
            text-xs
            font-semibold
            uppercase
            tracking-widest
            text-slate-400
          "
          >
            {title}
          </p>

          <h2
            className="
            mt-3
            break-all
            text-2xl
            font-bold
            leading-tight
            text-slate-900
            sm:text-3xl
          "
          >
            {count
              ? value.toLocaleString(
                  "id-ID"
                )
              : `Rp ${value.toLocaleString(
                  "id-ID"
                )}`}
          </h2>

          <div
            className="
            mt-4
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-emerald-50
            px-3
            py-1
            text-xs
            font-semibold
            text-emerald-600
          "
          >
            <ArrowUpRight size={13} />
            Live
          </div>

        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            shadow-lg
            ${color}
          `}
        >
          <Icon
            size={30}
            className="text-white"
          />
        </div>

      </div>
    </Card>
  );
}

export function FinanceSummary({
  businessId,
}: Props) {

  const fetchFinance =
    useFinanceStore(
      (state) => state.fetchFinance
    );

  const loading =
    useFinanceStore(
      (state) => state.loading
    );

  const summary =
    useFinanceStore(
      (state) => state.data.summary
    );

  const filter =
    useFinanceStore(
      (state) => state.filter
    );

  useEffect(() => {
    fetchFinance(
      businessId,
      filter
    );
  }, [
    businessId,
    filter,
    fetchFinance,
  ]);

  const cards = [
    {
      title: "Total Income",
      value: summary.totalIncome,
      icon: Banknote,
      color:
        "bg-gradient-to-br from-emerald-500 to-green-600",
    },
    {
      title: "Total Expense",
      value: summary.totalExpense,
      icon: ArrowDownCircle,
      color:
        "bg-gradient-to-br from-red-500 to-rose-600",
    },
    {
      title: "Gross Profit",
      value: summary.grossProfit,
      icon: TrendingUp,
      color:
        "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Net Profit",
      value: summary.netProfit,
      icon: Landmark,
      color:
        "bg-gradient-to-br from-violet-500 to-purple-600",
    },
    {
      title: "Sales",
      value: summary.totalSales,
      icon: CircleDollarSign,
      color:
        "bg-gradient-to-br from-green-500 to-emerald-600",
    },
    {
      title: "Cash In",
      value: summary.totalCashIn,
      icon: Banknote,
      color:
        "bg-gradient-to-br from-cyan-500 to-sky-600",
    },
    {
      title: "Purchase",
      value: summary.totalPurchases,
      icon: ShoppingBag,
      color:
        "bg-gradient-to-br from-orange-500 to-amber-600",
    },
    {
      title: "Cash Out",
      value: summary.totalExpenses,
      icon: Wallet,
      color:
        "bg-gradient-to-br from-pink-500 to-rose-600",
    },
    {
      title: "Total Transaksi",
      value:
        summary.totalTransactions +
        summary.totalPurchaseOrders +
        summary.totalCashOut +
        summary.totalCashInTransactions,
      icon: Receipt,
      color:
        "bg-gradient-to-br from-slate-600 to-slate-800",
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
            <Card
              className="
              h-40
              animate-pulse
              rounded-3xl
            "
            />
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