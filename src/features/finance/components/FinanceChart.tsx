"use client";

import { useEffect } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import { Card } from "@/components/ui/Card";

import { useFinanceStore } from "../store/finance.store";

type Props = {
  businessId: string;
};

export function FinanceChart({
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

  const chart =
    useFinanceStore(
      (state) => state.data.chart
    );

  useEffect(() => {
    fetchFinance(businessId);
  }, [
    businessId,
    fetchFinance,
  ]);

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-semibold">
          Grafik Keuangan
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Perkembangan Income, Expense,
          Gross Profit dan Net Profit.
        </p>
      </div>

      <div className="h-[430px] p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            Loading...
          </div>
        ) : chart.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            Belum ada data grafik.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={chart}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis
                tickFormatter={(value) =>
                  `${Math.round(
                    Number(value) / 1000
                  )}K`
                }
              />

              <Tooltip
                formatter={(value: any) => [
                  `Rp ${Number(
                    value
                  ).toLocaleString("id-ID")}`,
                ]}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#16a34a"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#dc2626"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                }}
              />

              <Line
                type="monotone"
                dataKey="grossProfit"
                name="Gross Profit"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                }}
              />

              <Line
                type="monotone"
                dataKey="netProfit"
                name="Net Profit"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}