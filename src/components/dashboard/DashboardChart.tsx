"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import { TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

export function DashboardChart() {
  const data = useDashboardStore(
    (state) => state.data.dailySales
  );

  return (
    <Card
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-5

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-emerald-100
                text-emerald-600
              "
            >
              <TrendingUp size={22} />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Revenue Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Income, Expense & Profit 30 hari terakhir
              </p>

            </div>

          </div>

        </div>

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
          "
        >
          Last 30 Days
        </div>

      </div>

      {/* Chart */}

      <div className="h-[360px]">

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
                  stopColor="#10B981"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="#10B981"
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
                  stopColor="#EF4444"
                  stopOpacity={0.30}
                />
                <stop
                  offset="95%"
                  stopColor="#EF4444"
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
                  stopColor="#0F766E"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="#0F766E"
                  stopOpacity={0}
                />
              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="date"
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#CBD5E1",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: 18,
                border: "1px solid #E2E8F0",
                background: "#fff",
                boxShadow:
                  "0 10px 40px rgba(15,23,42,.08)",
              }}
              formatter={(value: any) => [
                `Rp ${Number(value).toLocaleString("id-ID")}`,
              ]}
            />

            <Legend
              iconType="circle"
              wrapperStyle={{
                paddingTop: 20,
              }}
            />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#income)"
              name="Income"
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={3}
              fill="url(#expense)"
              name="Expense"
            />

            <Area
              type="monotone"
              dataKey="profit"
              stroke="#0F766E"
              strokeWidth={3}
              fill="url(#profit)"
              name="Profit"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
}