"use client";

import { useEffect, useMemo } from "react";
import {
  Package,
  Plus,
} from "lucide-react";

import { useProductStore } from "@/features/products";
import { useCartStore } from "@/features/pos/store/cart-store";

type Props = {
  businessId: string;
};

export function ProductGrid({
  businessId,
}: Props) {
  const loading = useProductStore(
    (state) => state.loading
  );

  const fetchProducts = useProductStore(
    (state) => state.fetchProducts
  );

  const products = useProductStore(
    (state) => state.products
  );

  const search = useProductStore(
    (state) => state.search ?? ""
  );

  const selectedCategory = useProductStore(
    (state) => state.selectedCategory
  );

  const addItem = useCartStore(
    (state) => state.addItem
  );

  useEffect(() => {
    fetchProducts(businessId);
  }, [businessId, fetchProducts]);

  const filteredProducts = useMemo(() => {
    const keyword = String(search)
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const matchCategory =
        !selectedCategory ||
        product.category_id ===
          selectedCategory;

      const matchSearch =
        keyword === "" ||
        product.name
          .toLowerCase()
          .includes(keyword) ||
        product.sku
          .toLowerCase()
          .includes(keyword);

      return (
        matchCategory &&
        matchSearch
      );
    });
  }, [
    products,
    search,
    selectedCategory,
  ]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--text-muted)]">
          Loading produk...
        </p>
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--text-muted)]">
          Produk tidak ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

      {filteredProducts.map((product) => (

        <button
          key={product.id}
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              sku: product.sku,
              price: Number(product.price),
              stock: product.stock,
            })
          }
          className="
            group
            overflow-hidden
            rounded-3xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            text-left
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[var(--primary)]
            hover:shadow-xl
          "
        >
          <div
            className="
              relative
              flex
              h-44
              items-center
              justify-center
              bg-gradient-to-br
              from-slate-100
              to-slate-200
            "
          >
            <Package
              size={64}
              className="text-slate-300 transition-transform duration-300 group-hover:scale-110"
            />

            <div
              className={`
                absolute
                right-4
                top-4
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                  product.stock > 10
                    ? "bg-emerald-500 text-white"
                    : product.stock > 0
                    ? "bg-amber-500 text-white"
                    : "bg-red-500 text-white"
                }
              `}
            >
              Stock {product.stock}
            </div>
          </div>

          <div className="p-5">

            <h3 className="line-clamp-2 min-h-[52px] text-lg font-bold text-[var(--foreground)]">
              {product.name}
            </h3>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              SKU • {product.sku}
            </p>

            <div className="mt-6 flex items-end justify-between">

              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  Harga
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[var(--primary)]">
                  Rp{" "}
                  {Number(product.price).toLocaleString("id-ID")}
                </h2>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--primary)]
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  group-hover:scale-110
                "
              >
                <Plus size={22} />
              </div>

            </div>

          </div>

        </button>

      ))}

    </div>
  );
}