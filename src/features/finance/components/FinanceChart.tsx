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

import {
  Activity,
} from "lucide-react";

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
    fetchFinance(
      businessId
    );
  }, [
    businessId,
    fetchFinance,
  ]);

  return (

    <Card
      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
    "
    >

      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-slate-100
        p-5
        lg:p-6
      "
      >

        <div>

          <div
            className="
            flex
            items-center
            gap-3
          "
          >

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              text-white
            "
            >
              <Activity size={22} />
            </div>

            <div>

              <h2
                className="
                text-lg
                font-bold
                lg:text-xl
              "
              >
                Grafik Keuangan
              </h2>

              <p
                className="
                text-sm
                text-slate-500
              "
              >
                Trend Income, Expense, Gross Profit & Net Profit
              </p>

            </div>

          </div>

        </div>

      </div>

      <div
        className="
        h-[300px]
        p-3
        sm:h-[380px]
        lg:h-[460px]
        lg:p-6
      "
      >

        {loading ? (

          <div
            className="
            flex
            h-full
            items-center
            justify-center
            text-slate-400
          "
          >
            Loading...
          </div>

        ) : chart.length === 0 ? (

          <div
            className="
            flex
            h-full
            items-center
            justify-center
            text-slate-400
          "
          >
            Belum ada data.
          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={chart}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 11,
                }}
              />

              <YAxis
                width={60}
                tick={{
                  fontSize: 11,
                }}
                tickFormatter={(value) =>
                  `${Math.round(
                    Number(value) / 1000
                  )}K`
                }
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "none",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,.08)",
                }}
                formatter={(
                  value: any
                ) => [
                  `Rp ${Number(
                    value
                  ).toLocaleString(
                    "id-ID"
                  )}`,
                ]}
              />

              <Legend
                wrapperStyle={{
                  paddingTop: 20,
                  fontSize: 12,
                }}
              />

              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10b981"
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
                stroke="#ef4444"
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
                stroke="#3b82f6"
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
                stroke="#8b5cf6"
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