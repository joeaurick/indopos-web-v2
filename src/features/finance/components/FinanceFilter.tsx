"use client";

import { useState } from "react";
import {
  CalendarDays,
  Filter,
} from "lucide-react";

import { useFinanceStore } from "../store/finance.store";

type Props = {
  businessId: string;
};

export function FinanceFilter({
  businessId,
}: Props) {
  const fetchFinance =
    useFinanceStore(
      (state) => state.fetchFinance
    );

  const filter =
    useFinanceStore(
      (state) => state.filter
    );

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const filters = [
    {
      label: "Semua",
      value: "all",
    },
    {
      label: "Hari Ini",
      value: "today",
    },
    {
      label: "Minggu Ini",
      value: "week",
    },
    {
      label: "Bulan Ini",
      value: "month",
    },
  ];

  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-4
      shadow-sm
      lg:p-6
    "
    >
      <div
        className="
        flex
        flex-wrap
        gap-2
      "
      >
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() =>
              fetchFinance(
                businessId,
                {
                  type:
                    item.value as any,
                }
              )
            }
            className={`
              rounded-2xl
              px-4
              py-2.5
              text-sm
              font-semibold
              transition
              ${
                filter.type ===
                item.value
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className="
        mt-6
        grid
        gap-4
        md:grid-cols-3
      "
      >
        <div>
          <label
            className="
            mb-2
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
          "
          >
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
              bg-slate-50
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "
          />
        </div>

        <div>
          <label
            className="
            mb-2
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
          "
          >
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
              bg-slate-50
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "
          />
        </div>

        <div
          className="
          flex
          items-end
        "
        >
          <button
            onClick={() =>
              fetchFinance(
                businessId,
                {
                  type: "custom",
                  startDate,
                  endDate,
                }
              )
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              transition
              hover:scale-[1.02]
            "
          >
            <Filter size={18} />
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
}