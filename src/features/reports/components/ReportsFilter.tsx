"use client";

import { useState } from "react";

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

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">

        <button
          onClick={() =>
            fetchReports(
              businessId,
              {
                type: "all",
              }
            )
          }
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            filter.type === "all"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Semua
        </button>

        <button
          onClick={() =>
            fetchReports(
              businessId,
              {
                type: "today",
              }
            )
          }
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            filter.type === "today"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Hari Ini
        </button>

        <button
          onClick={() =>
            fetchReports(
              businessId,
              {
                type: "week",
              }
            )
          }
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            filter.type === "week"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Minggu Ini
        </button>

        <button
          onClick={() =>
            fetchReports(
              businessId,
              {
                type: "month",
              }
            )
          }
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            filter.type === "month"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Bulan Ini
        </button>

      </div>

      <div className="mt-5 flex flex-wrap items-end gap-4">

        <div>
          <label className="mb-1 block text-sm font-medium">
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
            className="rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
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
            className="rounded-xl border p-3"
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
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Terapkan
        </button>

      </div>
    </div>
  );
}