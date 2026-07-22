"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Search,
  Settings,
} from "lucide-react";

import { useCashOutStore } from "../store/cash-out.store";

type Props = {
  businessId: string;
};

export function CashOutFilter({
  businessId,
}: Props) {
  const {
    filter,
    setFilter,
    fetchCashOut,
    data,
  } = useCashOutStore();

  const [search, setSearch] =
    useState(filter.search);

  useEffect(() => {
    fetchCashOut(
      businessId
    );
  }, [
    businessId,
    fetchCashOut,
  ]);

  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            Filter Pengeluaran
          </h3>

          <p className="text-sm text-slate-500">
            Cari transaksi berdasarkan kategori,
            tanggal, atau kata kunci.
          </p>

        </div>

        <Link
          href="/expense-categories"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium hover:bg-slate-100"
        >
          <Settings size={18} />
          Kelola Kategori
        </Link>

      </div>

      <div className="grid gap-4 lg:grid-cols-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Cari pengeluaran..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
          />

        </div>

        <select
          value={filter.categoryId}
          onChange={(e) =>
            setFilter({
              categoryId:
                e.target.value,
            })
          }
          className="rounded-xl border border-slate-200 px-3"
        >

          <option value="">
            Semua Kategori
          </option>

          {data.categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}

        </select>

        <input
          type="date"
          value={filter.startDate}
          onChange={(e) =>
            setFilter({
              startDate:
                e.target.value,
            })
          }
          className="rounded-xl border border-slate-200 px-3"
        />

        <input
          type="date"
          value={filter.endDate}
          onChange={(e) =>
            setFilter({
              endDate:
                e.target.value,
            })
          }
          className="rounded-xl border border-slate-200 px-3"
        />

      </div>

      <div className="mt-5 flex gap-3">

        <button
          onClick={() => {
            setFilter({
              search,
            });

            fetchCashOut(
              businessId
            );
          }}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Terapkan
        </button>

        <button
          onClick={() => {
            setSearch("");

            setFilter({
              search: "",
              categoryId: "",
              startDate: "",
              endDate: "",
            });

            fetchCashOut(
              businessId
            );
          }}
          className="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
        >
          Reset
        </button>

      </div>

    </div>
  );
}