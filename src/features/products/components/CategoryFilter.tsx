"use client";

import { useEffect } from "react";
import { FolderOpen } from "lucide-react";

import { useCategoryStore } from "@/features/categories/store/category.store";

type Props = {
  businessId: string;

  value: string | null;

  onChange: (
    value: string | null
  ) => void;
};

export function CategoryFilter({
  businessId,
  value,
  onChange,
}: Props) {
  const categories = useCategoryStore(
    (state) => state.categories
  );

  const fetchCategories =
    useCategoryStore(
      (state) =>
        state.fetchCategories
    );

  useEffect(() => {
    if (!businessId) return;

    fetchCategories(businessId);
  }, [
    businessId,
    fetchCategories,
  ]);

  return (
    <div className="relative w-full">


      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value || null
          )
        }
        className="
          h-12
          w-full

          appearance-none

          rounded-xl

          border
          border-slate-200

          bg-white

          pl-11
          pr-10

          text-sm
          font-medium
          text-slate-700

          outline-none

          transition-all
          duration-200

          hover:border-slate-300

          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      >
        <option value="">
          Semua Kategori
        </option>

        {categories.map(
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

      <svg
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-400
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>

    </div>
  );
}