"use client";

import { Package } from "lucide-react";

import { Product } from "../types";
import { ProductActions } from "./ProductActions";

function getStockStatus(stock: number) {
  if (stock === 0) {
    return {
      label: "Habis",
      className: "bg-red-100 text-red-700",
    };
  }

  if (stock <= 10) {
    return {
      label: "Menipis",
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    label: "Normal",
    className: "bg-green-100 text-green-700",
    };
}

type Props = {
  product: Product;

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;
};

export function ProductMobileCard({
  product,
  onEdit,
  onDelete,
}: Props) {
  const status = getStockStatus(product.stock);

  return (
    <div
      className="
        rounded-2xl
        border
        border-[var(--border)]
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="flex gap-4">

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-100
          "
        >
          <Package className="text-slate-500" />
        </div>

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-base font-bold">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            SKU : {product.sku}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {product.category_name ?? "Tanpa Kategori"}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
            >
              {status.label}
            </span>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Harga
              </p>

              <h4 className="font-bold text-[var(--primary)]">
                Rp {product.price.toLocaleString("id-ID")}
              </h4>

            </div>

            <div className="text-right">

              <p className="text-xs text-slate-500">
                Stock
              </p>

              <h4 className="font-bold">
                {product.stock}
              </h4>

            </div>

          </div>

          <div className="mt-5">

            <ProductActions
              onEdit={() => onEdit(product)}
              onDelete={() => onDelete(product)}
            />

          </div>

        </div>

      </div>

    </div>
  );
}