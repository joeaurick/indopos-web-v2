"use client";

import { useEffect } from "react";

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

  const fetchCategories = useCategoryStore(
    (state) => state.fetchCategories
  );

  useEffect(() => {
    if (!businessId) return;

    fetchCategories(businessId);
  }, [businessId, fetchCategories]);

  return (
    <select
      value={value ?? ""}
      onChange={(e) =>
        onChange(e.target.value || null)
      }
      className="
        rounded-xl
        border
        border-slate-200
        px-4
        py-3
        outline-none
        focus:border-teal-500
      "
    >
      <option value="">
        Semua Kategori
      </option>

      {categories.map((category) => (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}