"use client";

import { useState } from "react";

import {
  CalendarDays,
  Filter,
} from "lucide-react";

import { useReportStore } from "../store/report.store";

type Props = {
  businessId: string;
};

export function ReportsFilter({
  businessId,
}: Props) {
  const fetchReports =
    useReportStore(
      (state) => state.fetchReports
    );

  const filter =
    useReportStore(
      (state) => state.filter
    );

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const filters = [
    {
      key: "all",
      label: "Semua",
    },
    {
      key: "today",
      label: "Hari Ini",
    },
    {
      key: "week",
      label: "Minggu Ini",
    },
    {
      key: "month",
      label: "Bulan Ini",
    },
  ];

  return (
    <div
      className="
        w-full
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">

          <Filter size={22} />

        </div>

        <div>

          <h3 className="font-semibold text-slate-900">
            Filter Laporan
          </h3>

          <p className="text-sm text-slate-500">
            Pilih periode laporan
          </p>

        </div>

      </div>

      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {filters.map((item) => (

          <button
            key={item.key}
            onClick={() =>
              fetchReports(
                businessId,
                {
                  type: item.key as
                    | "all"
                    | "today"
                    | "week"
                    | "month",
                }
              )
            }
            className={`
              rounded-2xl
              border
              px-5
              py-3
              text-sm
              font-semibold
              transition-all
              duration-200
              ${
                filter.type === item.key
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
          >
            {item.label}
          </button>

        ))}
      </div>

      <div
        className="
          mt-8
          grid
          gap-4
          lg:grid-cols-[1fr_1fr_auto]
        "
      >
        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium">

            <CalendarDays size={16} />

            Dari

          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium">

            <CalendarDays size={16} />

            Sampai

          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        <button
          onClick={() =>
            fetchReports(
              businessId,
              {
                type: "custom",
                startDate,
                endDate,
              }
            )
          }
          className="
            h-[50px]
            self-end
            rounded-2xl
            bg-blue-600
            px-8
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Terapkan
        </button>

      </div>
    </div>
  );
}