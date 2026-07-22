"use client";

import { useEffect } from "react";

import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import { Card } from "@/components/ui/Card";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardChart() {
  const fetchDashboard =
    useDashboardStore(
      (state) => state.fetchDashboard
    );

  const data =
    useDashboardStore(
      (state) => state.data.dailySales
    );

  return (
    <Card className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Revenue Analytics
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Income, Expense dan Profit selama 30 hari terakhir.
          </p>

        </div>

        <div
          className="
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--hover)]
            px-4
            py-2
            text-sm
            font-medium
          "
        >
          Last 30 Days
        </div>

      </div>

      <div className="h-[330px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="income"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--success)"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="var(--success)"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="expense"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--danger)"
                  stopOpacity={0.40}
                />

                <stop
                  offset="95%"
                  stopColor="var(--danger)"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="profit"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.40}
                />

                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: "var(--text-muted)",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fill: "var(--text-muted)",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid var(--border)",
                background: "var(--card)",
              }}
              formatter={(value: any) => [
                `Rp ${Number(value).toLocaleString("id-ID")}`,
              ]}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="var(--success)"
              fill="url(#income)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="var(--danger)"
              fill="url(#expense)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="profit"
              name="Profit"
              stroke="var(--primary)"
              fill="url(#profit)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
}