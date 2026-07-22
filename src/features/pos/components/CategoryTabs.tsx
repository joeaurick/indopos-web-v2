"use client";

import { useEffect } from "react";
import { Grid2x2 } from "lucide-react";

import { useCategoryStore } from "@/features/categories";
import { useProductStore } from "@/features/products";

type Props = {
  businessId: string;
};

export function CategoryTabs({
  businessId,
}: Props) {
  const categories = useCategoryStore(
    (state) => state.categories
  );

  const fetchCategories = useCategoryStore(
    (state) => state.fetchCategories
  );

  const selectedCategory = useProductStore(
    (state) => state.selectedCategory
  );

  const setSelectedCategory = useProductStore(
    (state) => state.setSelectedCategory
  );

  useEffect(() => {
    fetchCategories(businessId);
  }, [businessId, fetchCategories]);

  return (
    <div
      className="
        flex
        items-center
        gap-3
        overflow-x-auto
        pb-2
        scrollbar-none
      "
    >
      <button
        type="button"
        onClick={() => setSelectedCategory(null)}
        className={`
          flex
          items-center
          gap-2
          whitespace-nowrap
          rounded-2xl
          border
          px-5
          py-3
          text-sm
          font-semibold
          transition-all
          duration-200
          ${
            selectedCategory === null
              ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-lg"
              : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--hover)]"
          }
        `}
      >
        <Grid2x2 size={16} />
        Semua
      </button>

      {categories.map((category) => {
        const active =
          selectedCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() =>
              setSelectedCategory(category.id)
            }
            className={`
              whitespace-nowrap
              rounded-2xl
              border
              px-5
              py-3
              text-sm
              font-semibold
              transition-all
              duration-200
              ${
                active
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-lg"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--hover)]"
              }
            `}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}