"use client";

import { useEffect } from "react";

import { useProductStore } from "@/features/products/store/product.store";
import { Product } from "@/features/products";

type Props = {
  businessId: string;
  onSelect: (product: Product) => void;
};

export function ProductSelector({
  businessId,
  onSelect,
}: Props) {
  const products = useProductStore(
    (state) => state.products
  );

  const fetchProducts =
    useProductStore(
      (state) => state.fetchProducts
    );

  useEffect(() => {
    fetchProducts(businessId);
  }, [
    businessId,
    fetchProducts,
  ]);

  return (
    <div>

      <label className="mb-2 block text-sm font-medium">
        Tambah Produk
      </label>

      <select
        defaultValue=""
        onChange={(e) => {

          const product =
            products.find(
              (item) =>
                item.id === e.target.value
            );

          if (product) {
            onSelect(product);
          }

          e.target.value = "";

        }}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      >

        <option value="">
          Pilih Produk...
        </option>

        {products.map((product) => (

          <option
            key={product.id}
            value={product.id}
          >
            {product.name} ({product.sku})
          </option>

        ))}

      </select>

    </div>
  );
}